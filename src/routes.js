var express = require('express');
var router = express.Router();
var Course=require('./db/Courses');
var ServiceProvider=require('./db/ServiceProvider.js');
var Admin=require('./db/Admin');

var StudentController = require('./controllers/StudentController');
var ServiceProviderController = require('./controllers/ServiceProviderController');
var AdminController = require('./controllers/AdminController');

var app = require('./server.js');

var path=require('path');


router.get('/',function (req,res){
        res.sendFile(path.join(__dirname,'../','app','index.html'))
})



//DONE

router.post('/forbussinus/login', function(req,res){
  ServiceProviderController.SPLogin(req,res,function(error,sp,type){
 
  if(type !="ERROR"){
  //check if match username pwd 
    var token = app.jwt.sign({ username: sp.username, id: sp._id, type:"ServiceProvider" }, app.app.get('super-secret'), {
    });
 
    res.json({
      type : type,
      token : token,
      message : "You are successfully logged in !",
      content : sp
    });
 
  } else 
    res.json({
      type : type,
      message : sp
    });
 
  });
 
});

//DONE

router.post('/login', function(req,res){
	StudentController.checkStudentLogin(req,res,function(error,student,type){
  if(type == "ERROR"){
		 res.json({
     type:type,
     message:student
     });
	} else {
     var token = app.jwt.sign({username: student.username, id: student._id, type:type}, app.app.get('super-secret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });
  res.json({
    token : token,
    type : type,
    message:"student token"
  });
  }

});

});


router.post('/register', function(req,res){

	StudentController.studentSignUP(req,res,function(error,student,type){
     if(type === "ERROR"){
          res.json({
        type:type,
        message:student
  });}
     else{
          res.json({
type:type,
message:"Student is registered",
content:student
          });
}
});

});


//DONE

router.post('/serviceprovider/register',function(req,res){
 
  ServiceProviderController.spRegister(req,res,(err,sp,type)=>{
    if(type === "ERROR")
          res.json({
            type : type,
            message : sp
 
          });
    else
          res.json({
            type : type,
            message : "You are registered successfully !",
            content : sp
          }); 
  });
 
});
 

router.get('/home/catalog',function(req,res){
StudentController.getAllCourses(req,res,(err,courses,type)=>{
  if(type==="ERROR"){
  res.json({
  type:type,
  message:courses
});
}else {
    res.json({
 type:type,
 message:"ALL COURSES",
  content:courses
});
  }
});

});





router.get('/home/viewreg',function(req,res){

  ServiceProviderController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type==="ERROR")
      res.send(sp);
    else
      res.json(sp);

  });

});
router.post('/home/search',function(req,res){
  StudentController.search(req,res,(err,course,type)=>{
    if(type==="ERROR"){
   res.json({
   type:type,
   message:course
   });

    }
    
    else {
      res.json({
     type:type,
     content:course,
     message:"course retrieved"
      });
    }
  });


});



router.use(function(req,res,next){ //this middleware adds the decoded token the req before continuing to any other routes
                                   //so if you need to access an attribute saved in the token,
                                   //use req.decoded.attrName
	var token = req.body.token;

	if(token){
		app.jwt.verify(token, app.app.get('super-secret'),function(err,decoded){

			if(!err){
				req.decoded = decoded
				console.log(req.decoded)
				console.log("worked !!")
				next()

			} else {

				return res.json({
					success:false,
					message:"Token not verfied;"
				});

			}

		});

	} else {
				return res.status("401").json({
					success:false,
					message:"No token;"
				});
	}

});

router.post('/studentprofile',function(req,res){
  if(req.decoded.type=="Student"){
StudentController.getStudentProfile(req,res,(err,prof,type)=>{

  res.json({
 type:type,
 message:"STUDENT PROFILE RETREIVED",
 content:prof
  });
  });

}else{
res.json({
type:type,
message:prof

});
}

});


router.post('/adminhomepage/verify', function(req,res){

  return AdminController.verifySP(req,res);

});





router.post('/ServiceProvider/courses/removeCourse',function(req,res){

  console.log(req.decoded);
 	return ServiceProviderController.removeCourse(req,res);

});



router.post('/ServiceProvider/courses/addCourse',function(req,res){
  console.log(req.decoded);
  ServiceProviderController.addCourse(req,res,(err,course,type)=>{
    if(type=="ERROR")
      res.send(course);
    else
      res.json(course);
  });

});

router.post('/coursepage/bookcourse',function(req,res){
 if(req.decoded.type=="Student"){
StudentController.bookCourse(req,res,(err,book,type)=>{
res.json({
type:type,
message:"Course is booked",
content:book
});

});}
else{
res.json({
type:type,
message:book
});

}


});
router.post('/studentprofile/review',function(req,res){
if(req.decoded.type=="Student"){


StudentController.typeReview(req,res,(err,review,type)=>{

res.json({
  type:type,
  message:"Review added",
  content:review
});

});
}
else {
  res.json({
    type:type,
    message:review
  });
}




});


router.post('/adminhomepage/deleteserviceprovider', function(req,res){

AdminController.DeleteServiceProvider(req,res,(err,review,type)=>{
if(review){
  res.json({
  type:type,
  message:review

  })
}
else{
  res.json({
    type:"ERROR",
    message:"Not admin?"
  })
}
  

});
});


router.post('/adminhomepage/viewunreg', function(req,res){

  return AdminController.viewUnregSP(req,res);

});

router.post('/adminhomepage/decline', function(req,res){

  return AdminController.declineSP(req,res);

});





//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;

