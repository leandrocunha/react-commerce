var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    formidable = require('formidable'),
    _ = require('lodash'),
    passport = require('passport'),
    bCrypt = require('bcrypt-nodejs');

var User = require('../models/user');


var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'ReactCommerce Admin' });
});

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


router.get('/dashboard', isAuthenticated, function(req, res){
  res.render('dashboard', {
    title: 'ReactCommerce Admin',
    user: req.user
  });
});

router.get('/tshirts/new', isAuthenticated, function(req, res) {
  res.render('productsnew', { title: 'Add New Product' });
});

/* edit product */
router.get('/product/:id', isAuthenticated, function(req, res){
  var db = req.db,
      collection = db.get('productcollection'),
      pId = req.params.id;

  collection.findById(pId, function (err, doc){
    if(err){
      console.log('Shits happen!');
    }else{
      var data = _.merge({"title": "Edit Product"}, doc);

      res.render('product-form', data);
    }
  });
});

router.post('/product/edit', isAuthenticated, function(req, res) {
  var db = req.db,
      collection = db.get('productcollection'),
      form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {

    var productID = fields.id;

    collection.findById(productID, function (err, doc) {
      if(err){
        console.log('Shits happen!');
      }else{
        collection.update({'_id': doc._id }, fields, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.redirect("/tshirts");
            }
        });        
        // collection.update( { "_id": doc._id.toString() }, fields, function (err, doc){
        //   if(err){
        //     console.log('Shits happen!');
        //   }else{
        //     res.redirect("tshirts");
        //   }
        // });
      }
    });
  });
});

/* POST to Add User Service */
router.post('/addproduct', isAuthenticated, function(req, res) {
  
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

router.get('/tshirts/productsdelete/:id', isAuthenticated, function(req, res) {
    var db = req.db;
    var collection = db.get('productcollection');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        (err === null) ? res.redirect("/tshirts") : { msg:'error: ' + err };
    });
});


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
    var db = req.db;
    var collection = db.get('users');

    collection.remove({ '_id' : req.params.id }, function(err) {
        (err === null) ? res.redirect("/users") : { msg:'error: ' + err };
    });
});

module.exports = router;
