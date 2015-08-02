// http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs  = require('express-handlebars');

// Configuring Passport
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var bCrypt = require('bcrypt-nodejs');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = require('./db.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var tshirts = require('./routes/tshirts');

var app = express();

var User = require('./models/user');

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'minhaChaveSecreta'}));
app.use(passport.initialize());
app.use(passport.session());

// Make our db accessible to our router
mongoose.connect(db.url);

// curl -v -I http://127.0.0.1:3000/
// curl -v -I --user bob:secret --digest http://127.0.0.1:3000/
// curl -v -d "hello=world" --user bob:secret --digest http://127.0.0.1:3000/
app.use('/', routes);
app.use('/users', users);
app.use('/tshirts', tshirts);
app.use('/product', tshirts);


// Passport
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
    console.log('serializing user: ');console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        console.log('deserializing user:',user);
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  },
  function(req, username, password, done) {
    console.log(username);
    console.log(password);
    // verifica no mongo se o nome de usuário existe ou não
    User.findOne({ 'email' :  username },
      function(err, user) {
        // Em caso de erro, retorne usando o método done
        if (err)
          return done(err);
        // Nome de usuário não existe, logar o erro & redirecione de volta
        if (!user){
          console.log('Usuário não encontrado para usuário '+username);
          return done(null, false,
                req.flash('message', 'Usuário não encontrado.'));
        }
        // Usuário existe mas a senha está errada, logar o erro
        if (!isValidPassword(user, password)){
          console.log('Senha Inválida');
          return done(null, false,
              req.flash('message', 'Senha Inválida'));
        }
        // Tanto usuário e senha estão corretos, retorna usuário através 
        // do método done, e, agora, será considerado um sucesso
        return done(null, user);
      }
    );
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
