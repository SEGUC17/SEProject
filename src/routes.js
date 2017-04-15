
var express = require('express');
var router = express.Router();
var Course=require('./db/Courses');
var ServiceProvider=require('./db/ServiceProvider.js');
var Admin=require('./db/Admin');

var StudentController = require('./controllers/StudentController');
var ServiceProviderController = require('./controllers/ServiceProviderController');
var app = require('./server.js')

router.post('/forbussinus/login', function(req,res){ServiceProviderController.SPLogin(req,res,function(sp, error){

//check if match username pwd 
	var token = app.jwt.sign({username: sp.username, id: sp._id, type:"ServiceProvider"}, app.app.get('super-secret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

	res.json({
		success:true,
		token :token


	})

})
});

router.use(function(req,res,next){


	var token = req.body.token;

	if(token){
		app.jwt.verify(token, app.app.get('super-secret'),function(err,decoded){

			if(!err){
				req.decoded = decoded
				console.log(req.decoded)
				console.log("worked !!")
				next()

			}
			else{
				return res.json({
					success:false,
					message:"Token not verfied;"
				})
			}
		})
	}
	else{
				return res.status("401").json({
					success:false,
					message:"No token;"
				})
	}
})
// router.post('/bookCourse', function(req,res){
// // 	StudentController.bookCourse(req,res)
// // });

router.post('/ServiceProvider/courses/addCourse',(req,res)=>{
	ServiceProviderController.addCourse(req,res);
});

// router.post('/ServiceProvider/courses/removeCourse',SPController.removeCourse);

// router.post('/ServiceProvider/courses/postAnnouncment',SPController.postAnnouncements);

// router.get('/Student/logout',(res,req)=>{
//  	req.logout();
// 	req.flash('success_msg','You are logged out');
//  });

// router.post('/updateCourse', SPController.updateCourse);

// router.get('/serviceProvideRegister',(req,res)=>{
// 	console.log('Service provider register page is required');
// });
// router.post('/ServiceProvideRegister',SPController.spRegister);
// router.get('/viewUnRegSP',(req,res)=>{
// 	console.log('view unregistered service provider page is required');
// });

// router.post('/viewUnRegSP',SPController.viewUnregSP);

// router.get('/ServiceProviderLogin',(req,res)=>{
// 	console.log('Service provider login');
// });

// router.post('/ServiceProviderLogin',SPController.SPLogin);

module.exports =router;

