var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    formidable = require('formidable'),
    _ = require('lodash'),
    passport = require('passport'),
    bCrypt = require('bcrypt-nodejs');


// MODEL
var User = require('../models/user');
var Product = require('../models/product');


// AUTH FUNCTION
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


// ROUTES

/* root */
router.get('/', function(req, res, next) {
  (req.isAuthenticated()) ?
    res.redirect('/dashboard') :
    res.render('home', { title: 'ReactCommerce Admin' });
});

router.get('/dashboard', isAuthenticated, function(req, res){
  res.render('dashboard', {
    title: 'ReactCommerce Admin',
    user: req.user
  });
});


/* authentication */
router.post('/', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })
);

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});


/* products */
router.get('/products', isAuthenticated, function(req, res) {
  Product.find({}, function (err, docs) {
    res.render('products', {
        "title": "Products",
        "products" : docs
    });
  });
});

router.get('/products/new', isAuthenticated, function(req, res) {
    res.render('products-new', { title: 'New Product' });
});

router.post('/products', isAuthenticated, function(req, res) {
  var product = new Product();
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    console.log(fields);

    var productTemp = {
        name: fields.name,
        price: fields.price,
        image: files.image.name
      };

    /* upload settings */
    var image_upload_path_old = files.image.path;
    var image_upload_path_new = './public/images/';
    var image_upload_name = files.image.name;
    var image_upload_path_name = image_upload_path_new + image_upload_name;
    /* end upload settings */

    product = _.merge(product, productTemp);

    product.save(function(err, docs){
      if (err){
        res.json({ message: 'Error in Saving product: ' + err });
      }else{

        /* upload file */
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
        /* end upload */ 

        res.redirect("/products");
      }
    });
  });
});

router.get('/products/:id/edit', isAuthenticated, function(req, res){
  Product.find({ '_id' : req.params.id }, function (err, docs) {
    console.log(docs);
    res.render('products-edit', {
        "title": "Edit Product",
        "product": docs
    });
  });
});

router.put('/products/:id', function(req, res) {
  Product.findById(req.params.id, function (err, doc) {
    if (err){
      res.json({
        error: true,
        message: 'Product not found!',
        errorSystem: err
      });
    }else{
      var form = new formidable.IncomingForm();

      form.parse(req, function(err, fields, files) {

        var productTemp = {
            name: fields.name,
            price: fields.price
          };

        if(files.image.size > 0 && files.image.name !== ''){
          productTemp.image = files.image.name;

          /* upload settings */
          var image_upload_path_old = files.image.path;
          var image_upload_path_new = './public/images/';
          var image_upload_name = files.image.name;
          var image_upload_path_name = image_upload_path_new + image_upload_name;
          /* end upload settings */
        }

        product = _.merge(doc, productTemp);

        product.save(function(err, docs){
          if (err){
            res.json({ message: 'Error in Saving product: ' + err });
          }else{

            if(files.image.size > 0 && files.image.name !== ''){
              /* upload file */
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
              /* end upload */
            }

            res.redirect("/products");
          }
        });
      });
    }
  });
});

router.get('/products/:id/delete', isAuthenticated, function(req, res) {
  // @TODO:delete image
    Product.remove({ '_id' : req.params.id }, function(err) {
        (err === null) ? res.redirect("/products") : { msg:'error: ' + err };
    });
});


/* users */
router.get('/users', isAuthenticated, function(req, res) {
  User.find({}, function (err, docs) {
    console.log(docs);
    res.render('users', {
        "title": "Users",
        "users" : docs
    });
  });
});



router.get('/users/new', isAuthenticated, function(req, res) {
    res.render('users-new', { title: 'Add User' });
});

router.post('/users/add', function(req, res) {
  var form = new formidable.IncomingForm();
  var user = new User();

  form.parse(req, function(err, fields, files) {
    user.name = fields.name;
    user.email = fields.email;
    user.password = createHash(fields.password);

    // save the user
    user.save(function(err) {
        if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
        }
        console.log('User Registration succesful');    
        // return done(null, user);
        res.redirect('/users');
    });
  });
});

router.get('/users/:id/edit', isAuthenticated, function(req, res){
  var db = req.db,
      collection = db.get('users');

  collection.findById(req.params.id, function (err, doc){
    if(err){
      console.log('Shits happen!');
    }else{
      var data = _.merge({"title": "Edit User"}, doc);

      res.render('users-edit', data);
    }
  });
});

router.post('/users/edit', isAuthenticated, function(req, res) {
  var db = req.db,
      collection = db.get('users'),
      form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    collection.findById(fields.id, function (err, doc) {
      if(err){
        console.log('Shits happen!');
      }else{
        collection.update({'_id': doc._id }, fields, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.redirect("/users");
            }
        });        
      }
    });
  });
});

router.get('/users/:id/delete', isAuthenticated, function(req, res) {
    User.remove({ '_id' : req.params.id }, function(err) {
        (err === null) ? res.redirect("/users") : { msg:'error: ' + err };
    });
});

module.exports = router;
