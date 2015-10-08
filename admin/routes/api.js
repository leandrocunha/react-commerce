var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var formidable = require('formidable');
var bCrypt = require('bcrypt-nodejs');
var _ = require('lodash');
var request = require('request');
var jstoxml = require('jstoxml');
var xml2js = require('xml2js').parseString;

// MODEL
var User = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart');

var ObjectId = mongoose.Types.ObjectId;

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
  var cart = new Cart(),
      cartTemp = {};

  res.header('Access-Control-Allow-Origin', "*");

  cartTemp.uemail = req.body.uemail;
  cartTemp.name = req.body.name;
  cartTemp.size = req.body.size;
  cartTemp.quantity = req.body.quantity;
  cartTemp.price = req.body.price;

  cart = _.merge(cart, cartTemp);

  cart.save(function(err, cart){
    if (err){
      res.json({ message: 'Error saving cart: ' + err });
    }else{
      res.json({
        success: true,
        message: 'Cart save with succesful!',
        cart: cart
      });
    }
  });
});

router.delete('/cart', function(req, res, next) {
  Cart.remove({_id: req.body.pId, uemail: req.body.uemail}, function(err, docs){
    if(err) {
      res.status(403).json({
        error: true,
        message: 'Error on try remove product of cart',
        errorSystem: err
      });
    }else{
      Cart.find({ 'uemail': req.body.uemail }, function (err, docs) {
        if(err){
          res.status(403).json({
            error: true,
            message: 'Error on try get Cart',
            errorSystem: err
          });
        }else{
          res.json({
            success: true,
            message: 'Product removed with succesful from Cart!',
            data: docs
          });
        }
      });
    }
  })
});

router.post('/cart/checkout', function(req, res, next) {

  var options;

  options = {
      method: 'POST',
      uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?email=leandroscunha@gmail.com&token=64653890FA2B4623A735883A7B4C0C2B',
      headers: {
          'Content-Type': 'application/xml; charset=UTF-8'
        },
      body: jstoxml.toXML({ checkout: {
          currency: 'BRL',
          items: {
            item: {
              id: 0001,
              description: 'Notebook Prata',
              amount: '4230.00',
              quantity: 1,
              weight: 1000
            }
          },
          reference: 'REF001',
          sender: {
            name: 'José Comprador',
            email: 'comprador@uol.com.br',
            phone: {
                areacode: '11',
                number: '56273440'
              }
          },
          shipping: {
            type: 1,
            address: {
              street: 'Av. Brig. Faria Lima',
              number: 1384,
              complement: '5o andar/complement',
              district: 'Jardim Paulistano',
              postalcode: 01452002,
              city: 'Sao Paulo',
              state: 'SP',
              country: 'BRA'
            }
          },
          sender: {
            email: 'c14522814295795555504@sandbox.pagseguro.com.br',
            name: 'Comprador de Teste',
            phone: {
              areaCode: 99,
              number: 812402101
            }
          }
          redirectURL: 'http://dev.reactcommerce.com.br/#/success'
        }

      })
    };

  return request(options, function(err, response, body) {
      if(response.statusCode == 201){
        console.log('document saved as: http://mikeal.iriscouch.com/testjs/'+ rand)
      } else {

        if(response.statusCode === 200){
          if(err){
            res.status(403).json({
              error: true,
              message: 'Error on try get Products',
              errorSystem: err
            });
          }else{
            xml2js(body, function (err, result) {
              res.json({
                success: true,
                message: 'success',
                data: result
              });
            });          
          }
        }
      }
  });
});


// HELPERS
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = router;
