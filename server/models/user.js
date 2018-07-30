const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});
var User = mongoose.model('User', userSchema);

module.exports = {User}
