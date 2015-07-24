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
            "title": "Products",
            "tshirts" : docs
        });
    });
});

router.get('/tshirts/new', function(req, res) {
  res.render('productsnew', { title: 'Add New Product' });
});

/* POST to Add User Service */
router.post('/addproduct', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var productName = req.body.name;

    // Set our collection
    var collection = db.get('productcollection');

    // Submit to the DB
    collection.insert({
        "name" : productName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("tshirts");
        }
    });
});

module.exports = router;
