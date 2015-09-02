var mongoose = require('mongoose');
 
module.exports = mongoose.model('Cart',{
  uemail: String,
  pid: String
});
