var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); //Instalamos session

// Importante
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const db = require('./database/models');
const Producto = db.Producto;
const Comentario = db.Comentario;
const Usuario = db.Usuario
const Op = db.Sequelize.Op;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); //Lineas importantes
app.use(express.urlencoded({ extended: false })); //Lineas importantes
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( //Más sobre session
  { secret:'proyectoIntegrador',
    resave: false,
    saveUninitialized: true }
));

// Gestionar la cookie
app.use(function(req,res,next){
  let idDeLaCookie = req.cookies.userId

  if (idDeLaCookie != undefined && req.session.user == undefined){
    Usuario.findByPk(idDeLaCookie)
    .then(user =>{
      req.session.user = user;

    })
    .catch(error =>{
      console.log(error)
    }) // Catch
  } // IF
  else{ // Si no tengo una cookie, que el programa continue

    return next()
  } 
  
}) // app.use

app.use(function(req,res,next){
  if(req.session.user != undefined){
    res.locals.user = req.session.user
    console.log('Estoy en sesión')
  }

  return next() //Es la clave para que el proceso siga adelante
}) // app.use


// Importante
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
