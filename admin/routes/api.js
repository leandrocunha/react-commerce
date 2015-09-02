var express = require('express');
var router = express.Router();
var passport = require('passport');
var formidable = require('formidable');
var bCrypt = require('bcrypt-nodejs');
var _ = require('lodash');

// MODEL
var User = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart');

var APITOKEN = "ReactCommerce"; //@TODO: Jogar esse token para um arquivo de configuração global.


// ROUTES

/* root */
router.get('/', function(req, res, next) {
  res.json({ message: 'what think you doing?' });
});


/* authentication */
router.post('/login', function(req, res, next) {
  
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', true);

  passport.authenticate('login', function(err, data, info) {
    
    if(err){
      return next(err);
    }

    if(data.error){ 
      return res.status(403).json(data);
    }

    req.logIn(data, function(err) {
      if (err) { return next(err); }

      return res.json({
        success: true,
        user: _.pick(data, ['accessToken', 'name', 'email', 'gender'])
      });
    });

  })(req, res, next);
});

router.post('/access', function(req, res) {
  User.find({'accessToken': req.body.uat}, function (err, doc) {
    if (err){
      res.json({
        error: true,
        message: 'User not found!',
        errorSystem: err
      });
    }else{
      res.json({
        success: true,
        user: _.pick(doc[0], ['accessToken', 'name', 'email', 'gender'])
      });
    }
  });
});


/* users */
router.get('/users', function(req, res, next) {
  User.find({}, function (err, docs) {
    if(err){
      res.status(403).json({
        error: true,
        message: 'Error on try get Users',
        errorSystem: err
      });
    }else{
     res.json({
      success: true,
      message: 'success',
      data: docs
     }); 
    }
  });
});

router.post('/users', function(req, res, next) {
  var user = new User();
  var userTemp;

  res.header('Access-Control-Allow-Origin', "*");

  userTemp = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      password: createHash(req.body.password),
      accessToken: createHash(req.body.email + APITOKEN)
    };

  user = _.merge(user, userTemp);

  user.save(function(err, docs){
    if (err){
      res.json({ message: 'Error in Saving user: ' + err });
    }else{
      res.json({
        success: true,
        message: 'User Registration succesful!',
        user: docs
      });
    }
  });
});

router.put('/users/:id', function(req, res) {
  User.findById(req.params.id, function (err, doc) {
    if (err){
      res.json({
        error: true,
        message: 'User not found!',
        errorSystem: err
      });
    }else{
      user = _.merge(doc, req.body);
      user.save(function(err, docs){
        if (err){
          res.json({ message: 'Error in Updating user: ' + err });
        }else{
          res.json({
            success: true,
            message: 'User Update succesful!',
            user: docs
          });
        }
      });
    }
  });
});


/* products */
router.get('/products', function(req, res, next) {
  Product.find({}, function (err, docs) {
    if(err){
      res.status(403).json({
        error: true,
        message: 'Error on try get Products',
        errorSystem: err
      });
    }else{
     res.json({
      success: true,
      message: 'success',
      data: docs
     }); 
    }
  });
});

router.get('/products/:slug', function(req, res){
  Product.find({ 'slug': req.params.slug }, function (err, docs) {
    if(err){
      res.status(403).json({
        error: true,
        message: 'Error on try get Products',
        errorSystem: err
      });
    }else{
      res.json({
        success: true,
        message: 'success',
        data: docs
      });
    }
  });
});


/* cart */
router.get('/cart/:uemail', function(req, res){
  Cart.find({ 'uemail': req.params.uemail }, function (err, docs) {
    if(err){
      res.status(403).json({
        error: true,
        message: 'Error on try get Cart',
        errorSystem: err
      });
    }else{
      res.json({
        success: true,
        message: 'success',
        data: docs
      });
    }
  });
});

router.post('/cart', function(req, res, next) {
  var cart = new Cart();
  var cartTemp;

  res.header('Access-Control-Allow-Origin', "*");

  cartTemp = {
      uemail: req.body.uemail,
      pid: req.body.pid
    };

  cart = _.merge(cart, cartTemp);

  cart.save(function(err, docs){
    if (err){
      res.json({ message: 'Error in Saving cart: ' + err });
    }else{
      res.json({
        success: true,
        message: 'Cart Registration succesful!',
        cart: docs
      });
    }
  });
});


// HELPERS
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = router;
