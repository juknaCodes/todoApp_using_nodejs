const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
  token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123');

  user.tokens.push({access, token});
  return user.save().then(()=> {
    return token;
  });
};

var User = mongoose.model('User', userSchema);
module.exports = {User}
