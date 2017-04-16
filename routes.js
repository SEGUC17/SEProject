
var express = require('express');
var router = express.Router();
var Course=require('./db/Courses');
var ServiceProvider=require('./db/ServiceProvider.js');
var Admin=require('./db/Admin');
var AdminController = require('./controllers/AdminController');

var StudentController = require('./controllers/StudentController');
var ServiceProviderController = require('./controllers/ServiceProviderController');
var app = require('./server.js');


router.get('/',(req,res)=>{
	
	res.json({
		message:'json men 2l home page'
			});

});


router.post('/forbussinus/login', function(req,res){
	ServiceProviderController.SPLogin(req,res,function(sp, error){
	
if(!error){
//check if match username pwd 
	var token = app.jwt.sign(
		{username: sp.username,
		 id: sp._id,
		  type:"ServiceProvider"}, 
		  app.app.get('super-secret'), {
        
        });

	res.json({
		success:true,
		token :token

	})
}

})
});

//token of sp yasmin pwd:password
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlhc21pbiIsImlkIjoiNThmMzZjOWZkMzM1ZDUxM2Q1ZmE4NDM1IiwidHlwZSI6IlNlcnZpY2VQcm92aWRlciIsImlhdCI6MTQ5MjM1MzMxMX0.4MlBCH7m8tt9asctTnnMG2rSEHBlYvgd9i_DLG4JaCs"

router.post('/student/signup',(req,res)=>{
	StudentController.studentSignUP(req,res,(error,student)=>{
		if(!error){
			var token=app.jwt.sign(
				{username:student.username 
				,id:student._id,
				type:'Student'}
				,app.app.get('super-secret'),
				{});
			//myToken for yasminAbdalla ,pss :yasmin
			//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlhc21pbkFiZGFsbGEiLCJpZCI6IjU4ZjM0N2JiYmI1MWMzMTQ1NGQyMmZmZiIsInR5cGUiOiJTdHVkZW50IiwiaWF0IjoxNDkyMzM4NjIwfQ.BgmIZCTzMye7eaAkdwBe6Kk4ZJ0CfUL-4etM0cMHmFw
			res.json({
				success:true,
				token:token
			})
		}
	});

});

router.post('/student/login',function(req,res){

	StudentController.checkStudentLogin(req,res,(student,error)=>{
		if(!error){

			var token=app.jwt.sign({username:student.username 
				,id:student._id,
				type:"Student"}
				,app.app.get('super-secret'),
				{});

			res.json({
				success:true,
				token:token
			})
		}
	})
});

// router.post('/admin/login',function(req,res){
// 	AdminController.
// })

router.post('/serviceprovider/register',function(req,res){
	ServiceProviderController.spRegister(req,res);
});



router.post('/admin/verifysp',function(req,res){
	
	AdminController.verifySP(req,res);

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
});

// router.post('/bookCourse', function(req,res){
// // 	StudentController.bookCourse(req,res)
// // });




router.post('/ServiceProvider/courses/addCourse',function(req,res){
	console.log(req.decoded);
	ServiceProviderController.addCourse(req,res);

});

 router.post('/ServiceProvider/courses/removeCourse',function(req,res){
 	console.log(re.decoded);
 	ServiceProviderController.
 });

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


