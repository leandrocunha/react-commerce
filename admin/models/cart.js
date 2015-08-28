var mongoose = require('mongoose');
 
module.exports = mongoose.model('Cart',{
  uid: Number,
  pid: Number
});
