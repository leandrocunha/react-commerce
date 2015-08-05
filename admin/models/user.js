var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
  name: String,
  email: String,
  gender: Number,
  password: String
});
