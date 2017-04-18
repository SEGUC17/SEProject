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


//AKEED DONE

router.post('/login', function(req,res){
  StudentController.checkStudentLogin(req,res,function(error,message,type){
    if(type == "ERROR")
		  res.json({
        type : type,
        message : message
      });
    else {
      var token = app.jwt.sign({username: student.username, id: student._id, type:type}, app.app.get('super-secret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
      });

      if(type == "Admin")
        res.json({
          token : token,
          type : "SUCCESS",
          message : "You are successfully logged in !",
          content : message
        });
      else 
         res.json({
          token : token,
          type : "SUCCESS",
          message : "You are successfully logged in !",
          content : message
        });
    }

  });

});

//NOT SURE 

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



router.post('/ServiceProvider/courses/removeCourse',function(req,res){

  console.log(re.decoded);
 	return ServiceProviderController.removeCourse(req,res);

});


//router.post('/ServiceProvider/update)



//AKEED DONE

router.post('/ServiceProvider/courses/addCourse',function(req,res){
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




router.post('/ServiceProvider/courses/removeCourse',function(req,res){

  console.log(req.decoded);
  if(req.decoded.type=="ServiceProvider"){
ServiceProviderController.removeCourse(req,res,(err,result,type)=>{
  if(!(type=="ERROR")){
    res.json({type:type,
      message:"Course has been successfully removed ",
      content:result
    });
  }else{
      res.json({type:type,
      message:result
    });
  }

});
}else{
    res.json({type:"ERROR",
      message:"YOU ARE NOT A SERVICE PROVIDER ",
        });
}

});


//AKEED DONE
router.post('/ServiceProvider/ViewReviews', function(req,res){
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

});





router.post('/ServiceProvider/viewAllEnrolledStudents', function(req,res){
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

});


router.post('/adminhomepage/viewunreg', function(req,res){

  return AdminController.viewUnregSP(req,res);

});

router.post('/adminhomepage/decline', function(req,res){

  return AdminController.declineSP(req,res);

});



//done
router.post('/admin/clearUnverfiedSP',(req,res)=>{
  ServiceProviderController.clearUNverSP(req,res,(err,result,type)=>{
    if(type=="ERROR"){
      res.send(result);
    }else{
      res.json(result);
    }

  });

});

router.post('/ServiceProvider/update',(req,res)=>{
  console.log('in');
  // res.send("HELLO");
  ServiceProviderController.createAndUpdatePortofolio(req,res,(err,result,type)=>{
    if(type=="ERROR"){
      res.send(result);
    }else{
      res.json(result);
    }
    

  });

})




router.post('/coursepage/bookcourse',function(req,res){
if(req.decoded.type=="Student"){
StudentController.bookCourse(req,res,(err,book,type)=>{
  if(type=="ERROR"){
res.json({
  type:type,
  message:book
});
    
  }else{
    res.json({
      type:type,
      message:"YOU HAVE SUCCESSFULLY BOOKED THE COURSE",
      content:book

    });
  }

});
}else{
   res.json({type:"ERROR",
      message:"YOU ARE NOT A STUDENT"
    });
}


});





module.exports =router;

