var express = require('express');
var router = express.Router();
var passport = require('passport');
var formidable = require('formidable');
var bCrypt = require('bcrypt-nodejs');
var _ = require('lodash');

// MODEL
var User = require('../models/user');


// ROUTES

/* root */
router.get('/', function(req, res, next) {
  res.json({ message: 'what think you doing?' });
});


/* authentication */
router.post('/login', function(req, res, next) {
  
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Credentials', true);

  passport.authenticate('login', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { 
      return res.status(403).json({
                  error: true,
                  message: info.message,
                  errorSystem: err,
                  user: user
                });
    }
    
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({
        success: true,
        message: info,
        user: user
      });
    });
  })(req, res, next);
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
  var form = new formidable.IncomingForm();
  var user = new User();

  form.parse(req, function(err, fields, files) {
    user.name = fields.name;
    user.email = fields.email;
    user.password = createHash(fields.password);

    user.save(function(err){
      if (err){
        res.json({ message: 'Error in Saving user: ' + err });
      }else{
        res.json({
          success: true,
          messagem: 'User Registration succesful!'
        });
      }
    });
  });
});


// HELPERS
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


module.exports = router;
