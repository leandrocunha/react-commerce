var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');

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
  
  var db = req.db;
  var collection = db.get('productcollection');
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(fields);

    var productName = fields.name,
        productDescription = fields.description,
        productPrice = fields.price,
        image = files.image,
        image_upload_path_old = image.path,
        image_upload_path_new = './public/images/',
        image_upload_name = image.name,
        image_upload_path_name = image_upload_path_new + image_upload_name;

    collection.insert({
        "name": productName,
        "description": productDescription,
        "price": productPrice,
        "image": image_upload_name        
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
          if (fs.existsSync(image_upload_path_new)) {
            fs.rename(
              image_upload_path_old,
              image_upload_path_name,
              function (err) {
              if (err) {
                console.log('Err: ', err);
                res.end('Deu merda na hora de mover a imagem!');
              }
              var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
              console.log(msg);
              res.end(msg);
            });
          } else {
            fs.mkdir(image_upload_path_new, function (err) {
              if (err) {
                console.log('Err: ', err);
                res.end('Deu merda na hora de criar o diretório!');
              }
              fs.rename(
                image_upload_path_old,
                image_upload_path_name,
                function(err) {
                var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                console.log(msg);
                res.end(msg);
              });
            });
          }

          // And forward to success page
          res.redirect("tshirts");
        }
    });
  });    

});

router.get('/tshirts/productsdelete/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('productcollection');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        (err === null) ? res.redirect("/tshirts") : { msg:'error: ' + err };
    });
});

router.put('/tshirts/productsedit/:id', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var db = req.db;
    var collection = db.get('productcollection');
    var id = req.body.id,
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;

    collection.findById(id, function (err, doc) {
        //update it
        doc.update({
            name : name,
            badge : badge,
            dob : dob,
            isloved : isloved
        }, function (err, blobID) {
          if (err) {
              res.send("There was a problem updating the information to the database: " + err);
          } 
          else {
                  //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                  res.format({
                      html: function(){
                           res.redirect("/blobs/" + blob._id);
                     },
                     //JSON responds showing the updated values
                    json: function(){
                           res.json(blob);
                     }
                  });
           }
        });
    });

module.exports = router;
