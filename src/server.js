var express = require('express');
var router = require('./routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var cons = require('consolidate');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var multer  = require('multer');

var upload = multer({ 
	storage: storage ,
    limits: {filesize: 10000000}
    }).single('myfile');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '_' +file.originalname )
  }
});





var Admin = require('./db/Admin');
var AdminController = require('./controllers/AdminController');

var ServiceProviderController = require('./controllers/ServiceProviderController');
var StudentController = require('./controllers/StudentController');
var ServiceProvider =require('./db/ServiceProvider');

var app = express();


app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.json({success: false, message: "file too large, max is 10MB"});
      }else{
        console.log(err);
        res.json({success: false, message: "could not upload"});
      }
    }else{
    	console.log(req);
      if(!req.file){
        res.json({success: false, message: "no file was selected"});
      }else{
        res.json({success: true, message: "file was uploaded! :D"});
      }
    }

  });
});


mongoose.connect('mongodb://localhost:27017/platform');



// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '../app'));            
app.set('view engine', 'html');
app.set('super-secret', 'sedki');

// configure app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, '../app')));


app.use(flash()); // use connect-flash for flash messages stored in session



app.use(router);


// start the server
app.listen(8080, function(){
    console.log("server is listening on port 8080");
});

module.exports.app = app;
module.exports.jwt = jwt;