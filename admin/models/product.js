var mongoose = require('mongoose');
 
module.exports = mongoose.model('Product',{
  name: String,
  slug: String,
  price: Number,
  image: String
});
