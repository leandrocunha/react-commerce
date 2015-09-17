var mongoose = require('mongoose');
 
module.exports = mongoose.model('Cart',{
  uemail: String,
  name: String,
  size: String,
  quantity: Number,
  price: String  
});
