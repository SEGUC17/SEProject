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

var SPController = require('./controllers/ServiceProviderController');
var ServiceProvider = require('./db/ServiceProvider');

var app = express();

mongoose.connect('mongodb://localhost/platform');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}));

app.use(flash()); // use connect-flash for flash messages stored in session

app.use(passport.initialize());  
app.use(passport.session());  

app.use(router);

SPController.addSP(new ServiceProvider({"organizationName":"asasas",
	"field" :"wdwdwqdqwdwdw",
	"description" :"swqqswswqsw",
	"mobileNumber" :123456,
	"email" :"ssts@gmail.com",
	"address" :"ssswswswswsws",
	"polices":"	qsqsqsqsqss"}));

console.log(ServiceProvider.find());


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
});


