const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true,
    unique:true,
    validate: {
      validator:  validator.isEmail,
      message: props => `${props.value} is not a valid email!`
    },
  },
  password : {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
  tokens : [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    }
  }]
});

userSchema.methods.toJSON = function () {
  let user = this,
  userObject = user.toObject();

  return _.pick(user, ["_id", "email"]);
}
userSchema.methods.generateAuthToken = function () {
  let user = this,
  access = "auth",
  token = jwt.sign({_id : user._id.toHexString(), access}, process.env.JWT_SECRET);

  user.tokens.push({access, token});
  return user.save().then(()=> {
    return token;
  });
};

userSchema.statics.findByCredentials = function(email, password) {
  let model = this;
  try {
    return model.findOne({email}).then((user)=>{
      if(!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) {
            reject()
          } else {
            resolve(user);
          }
        });
      })
    });
  } catch(err) {
    return Promise.reject();
  }
}

userSchema.statics.findByToken = function(jwtoken) {
  let model = this,
    decoded;
  try {
    decoded = jwt.verify(jwtoken, process.env.JWT_SECRET);
    return model.findOne({
      _id : decoded._id,
      'tokens.access': decoded.access,
      'tokens.token': jwtoken
    });
  } catch(err) {
    return Promise.reject();
  }
}

userSchema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function(err, hash) {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.deleteToken = function (token) {
  let user = this;

  return user.update({
    $pull : {
      tokens: {token}
    }
  });
}

var User = mongoose.model('User', userSchema);
module.exports = {User}
