let {User} = require('./../models/user.js');

let authenticate = (req, res, next) => {
  let jwtoken = req.header('x-auth');

  User.findByToken(jwtoken).then((user)=> {
    if(!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = jwtoken;
    next();
  }).catch((err) => {
    res.status(401).send();
  });
}

module.exports = {authenticate};
