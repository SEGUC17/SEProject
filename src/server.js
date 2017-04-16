var express = require('express');
var router = require('./routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var Cookies = require( "cookies" );

var jwt = require('jsonwebtoken');

var Admin = require('./db/Admin');
var AdminController = require('./controllers/AdminController');

var ServiceProviderController = require('./controllers/ServiceProviderController');
var StudentController = require('./controllers/StudentController');
var ServiceProvider =require('./db/ServiceProvider');

var app = express();



mongoose.connect('mongodb://localhost:27017/platform');

// configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('super-secret', 'sedki');



app.use(flash()); // use connect-flash for flash messages stored in session


app.use(session({secret: "secret", resave: false, saveUninitialized: false}));

app.use(router);

// console.log("hhhhhh");


 // var sp = new ServiceProvider ({username: "youmna",
 //                               password: "123"
 // });
 // AdminController.verifySP();
 // ServiceProviderController.SP(sp);

// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
});

module.exports.app = app;
module.exports.jwt = jwt;