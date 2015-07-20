var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tshirts', function(req, res, next) {
  var db = req.db;
  var collection = db.get('productcollection');
  console.log('teste');
  collection.find({},{},function(e,docs){
      res.render('tshirts', {
          "tshirts" : docs
      });
  });
});

module.exports = router;
