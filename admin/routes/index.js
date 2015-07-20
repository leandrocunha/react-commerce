var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'ReactCommerce Admin' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/tshirts', function(req, res) {
    var db = req.db;
    var collection = db.get('productcollection');
    collection.find({},{},function(e,docs){
        res.render('products', {
            "tshirts" : docs
        });
    });
});

module.exports = router;
