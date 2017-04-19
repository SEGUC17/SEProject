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



//AKEED DONE

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

//lessaaaaa
router.post('/adminhomepage/getServiceProvidersNotifications');




//AKEED DONE

router.post('/login', function(req,res){
  StudentController.checkStudentLogin(req,res,function(error,message,type){
    if(type == "ERROR")
		  res.json({
        type : type,
        message : message
      });
    else {
      var token = app.jwt.sign({username: message.username, id: message._id, type:type}, app.app.get('super-secret'), {});

        res.json({
          token : token,
          type : "SUCCESS",
          message : "You are successfully logged in !",
          content : message
        });
 
    }

  });

});



router.post('/coursepage/bookcourse',function(req,res){
  if(req.decoded.type=="Student"){
    StudentController.bookCourse(req,res,(err,book,type)=>{
      res.json({
        type : type,
        message : "Course is successfully booked !",
        content : book
      }); 

    });
  }else
    res.json({
    type : type,
    message : "You are not a student !"

    });

});



router.post('/register', function(req,res){

	StudentController.studentSignUP(req,res,function(error,student,type){
     if(type === "ERROR")
          res.json({
            type : type,
            message : student
          });
     else
          res.json({
            type : type,
            message : "You are registered successfully !",
            content : student
          });
        
});

});


//AKEED DONE

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


//AKEED DONE

router.get('/home/viewreg',function(req,res){
      
  ServiceProviderController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type === "ERROR")
      res.json({
        type : type,
        message : sp
      });
    else
      res.json({
        type : type,
        content : sp
      });
         
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



router.post('/adminhomepage/verify', function(req,res){

  return AdminController.verifySP(req,res);

});



router.post('/serviceprovider/courses/removeCourse',function(req,res){

  console.log(re.decoded);
 	return ServiceProviderController.removeCourse(req,res);

});


//router.post('/ServiceProvider/update)



//AKEED DONE

router.post('/serviceprovider/courses/addCourse',function(req,res){
  console.log(req.decoded);
  ServiceProviderController.addCourse(req,res,(err,course,type)=>{
    if(type == "ERROR")
      res.json({
        type : type,
        message : course
      });
    else 
      res.json({
        type : type,
        message : "Course is added successfully !",
        content : course
      });
  });
     
});


router.post('/serviceprovider/courses',function(req,res){
  if(req.decoded.type == "ServiceProvider"){
  ServiceProviderController.viewCourses(req,res,function(err,message,type){
    if(type == "ERROR")
      res.json({
        type : type,
        message : message
      });
    else 
      res.json({
        type : type,
        content : message
      });
  });
}else 
  res.json({
        type : "ERROR",
        message : "Yor are not a service provider !"
      });


});



router.post('/serviceprovider/updatePortofolio',function(req,res){
  if(req.decoded.type == "ServiceProvider"){
    ServiceProviderController.updatePortofolio(req,res,function(err,message,type){
      if(type == "ERROR")
        res.json({
          type : type,
          message : message
        });
      else 
        res.json({
          type : type,
          message : "Portofolio updated successfully !",
          content : message
        });
    });
  }else 
   res.json({
        type : "ERROR",
        message : "You are not a service provider !"
      });

});


//AKEED DONE
router.post('/serviceprovider/ViewReviews', function(req,res){
  if(req.decoded.type == "ServiceProvider"){
    ServiceProviderController.ViewReviews(req,res,function(err,reviews,type){
        if(type === "ERROR")
          res.json({
            type : type,
            message : reviews
          });
        else
          res.json({
            type : type,
            content : reviews
          });
    });
  }else
    res.json({
      type : "ERROR",
      message : "You are not a service provider !"
    });

});





router.post('/serviceprovider/viewAllEnrolledStudents', function(req,res){
  if(req.decoded.type == "ServiceProvider"){
    ServiceProviderController.viewAllEnrolledStudents(req,res,function(err,message,type){
      if(type == "ERROR")
        res.send({
          type : type,
          message : message
        });
      else
        res.json({
          type : type,
          enrolledStudents : message
        });
    });
  }else 
    res.json({
      type : "ERROR",
      message : "You are not a service provider !"
    });
});


router.post('/adminhomepage/viewunreg', function(req,res){
  if(req.decoded.type == "Admin"){
    AdminController.viewUnregSP(req,res,function(err,message,type){
      if(type === "ERROR")
        res.json({
          type : type,
          message : message
        });
      else
        res.json({
          type : type,
          content : message
        });
    });
  }else 
    res.json({
      type : "ERROR",
      message : "You are not an admin !"
    });

});



//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;
