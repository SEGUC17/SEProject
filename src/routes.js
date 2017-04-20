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

// start --- later they will be moved under middleware
router.post('/adminhomepage/verify', function(req,res){
     return AdminController.verifySP(req,res);
});

router.post('/ServiceProvider/courses/removeCourse',function(req,res){
  console.log(re.decoded);
  return ServiceProviderController.removeCourse(req,res);
});

router.post('/ServiceProvider/courses/addCourse',function(req,res){
	console.log(req.decoded);
	return ServiceProviderController.addCourse(req,res);
});

router.post('/adminhomepage/viewunreg', function(req,res){
	return AdminController.viewUnregSP(req,res);
});

router.post('/adminhomepage/decline', function(req,res){
  console.log("routes");
   console.log(req.body.email);
   return AdminController.declineSP(req,res);
});
//end ----later they will be moved under middleware

router.get('/',function (req,res){
        res.sendFile(path.join(__dirname,'../','app','index.html'))
});

<<<<<<< HEAD
// router.get('/admin',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','adminPage.html'))
// });

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

    	return res.json({
    		success:true,
    		token :token

    	})
    } else{
    	return res.json({
    		success:false,
    		message:"wrong username or password"
       });

       }
     });
});
//login bta3 el student
router.post('/login', function(req,res){
  	StudentController.checkStudentLogin(req,res,function(student, error){
        if(error){
  		return res.json({
  			success: false,
  			message:"wrong username or password"
  		});
  	}
  //check if match username pwd
    var token = app.jwt.sign({username: student.username, id: student._id,  type:"Student"}, app.app.get('super-secret'), {
              //expiresInMinutes: 1440 // expires in 24 hours
            });
    	return res.json({
    		success:true,
    		token :token

    	})

    })
=======
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

>>>>>>> frontend_backend_combined
});


router.post('/register', function(req,res){
<<<<<<< HEAD
	StudentController.studentSignUP(req,res,function(student, error){

//check if match username pwd
  	var token = app.jwt.sign({username: student.username, id: student._id, type:"Student"}, app.app.get('super-secret'), {
            //expiresInMinutes: 1440 // expires in 24 hours
          });
  	return res.json({
  		success:true,
  		token :token
  	})
  })
=======

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
 
>>>>>>> frontend_backend_combined
});
 

<<<<<<< HEAD
router.post('/serviceprovider/register',function(req,res){
    	return ServiceProviderController.spRegister(req,res);
});

router.get('/home/viewreg',function(req,res){

    ServiceProviderController.getAllVerifiedServiceProvider(req,res,
      function(err, sp){
          res.send(sp);
     });
});

router.use(function(req,res,next){ //this middleware adds the decoded token the req before continuing to any other routes.
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


=======
router.get('/home/catalog',function(req,res)
{
  StudentController.getAllCourses(req,res,(err,courses,type)=>
  {
    if(type==="ERROR")
    {
    res.json({
    type:type,
    message:courses
    });

  }
else {
    res.json({
 type:type,
 message:"ALL COURSES",
  content:courses
  });

  }
})

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


router.get('/home/viewreg',function(req,res){

 // console.log("hiiiiiiiiiiiiiiiii")
      
  AdminController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type==="ERROR")
      res.send(sp);
    else
      res.json(sp);
         
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


router.post('/serviceprovider/removeannouncement',function(req,res){
  ServiceProviderController.removeAnnouncements(req,res,(err,message,type)=>{
    if(type=="ERROR"){
      res.json({
          type:type,
          message:message
        });
    }else{
res.json({
  type:type,
  message:"ANNOUNCMENT REMOVED",
  content:message
});
    }

  });
});


router.post('/serviceprovider/viewannonnoucement',function(req,res){
  ServiceProviderController.viewAnnouncemnets(req,res,(err,message,type)=>{
    if(type=="ERROR"){
      res.json({
        type:type,
        message:message
      });
    }else{
      res.json({
        type:type,
        message:"ALL ANNOUNCMENTS",
        content:message
      });
    }
});
});


router.post('/serviceprovider/postannouncement',function(req,res){
  ServiceProviderController.postAnnouncements(req,res,(err,message,type)=>{
    if(type=="ERROR"){
      res.json({
        type:type,
        message:message
      });
    }else{
      res.json({
        type:type,
        message:"YOU CAN POST ANNOUNCMENT",
        content:message
      });

    }

  });
});


router.post('/coursepage/bookcourse',function(req,res){
  // /coursepage/bookcourse/:id'
  // var id = req.params.id;
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
if(req.decoded.type=="Admin"){
 AdminController.verifySP(req,res,(err,message,type)=>{
  if(type=="ERROR"){
    res.json({
      type:type,
      message:message
    })
  }else{
    res.json({
      type:type,
      message:"SERVICE PROVIDER HAS BEEN SUCCESSFULLY REGISTERED",
      content:message
    });
  }
 });
}else{
  res.json({
    type:"ERROR",
    message:"YOU ARE NOT AN ADMIN"
  });
}

});


router.post('/serviceprovider/courses/update', function(req,res){
  if(req.decoded.type=="ServiceProvider"){
ServiceProviderController.updateCourse(req,res,(err,message,type)=>{
  if(type=="ERROR"){
    res.json({
      type:type,
      message:message
    });
  }else{
    
    res.json({
      type:type,
      message:"COURSE HAS BEEN SUCCESSFULLY UPDATE",
      content:message
    });
  }

});
}else{
  res.json({
    type:"ERROR",
    message:"YOU ARE NOT A SERVICE PROVIDER"
  });
}
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


router.post('/serviceprovider/courses/removeCourse',function(req,res){

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



router.post('/serviceprovider/courses/addCourse',function(req,res){

  if(req.decoded.type=="ServiceProvider"){
  ServiceProviderController.addCourse(req,res,(err,course,type)=>{
    if(type=="ERROR"){
      res.json({
        type:type,
        message:course});
    }
    else {
      res.json({
        type:type,
        message:"THE COURSE HAS BEEN SUCCESSFULLY ADDED",
        content:course
      });
    }
  });
}else{
  res.json({
    type:"ERROR",
    message:"YOU ARE NOT A SERVICE PROVIDER"});
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





router.post('/admin/declineSP',function(req,res){
  if(req.decoded.type=="Admin"){
    AdminController.declineSP(req,res,(err,message,type)=>{
      if(err){
        res.json({
          type:type,
          message:message
        });
      }else{
        res.json({
          type:type,
          message:"SERVICE PROVIDER HAS BEEN DECLINED",
          content:message
        });
      }

    });
  }else{
    res.json({
      type:"ERROR",
      message:"YOU ARE NOT AN ADMIN"
    });
  }
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


router.post('/admin/deleteSP',function(req,res){
  if(req.decoded.type=="Admin"){
AdminController.DeleteServiceProvider(req,res,(err,message,type)=>{
  if(type=="ERROR")
  {
    res.json({
      type:type,
      message:message
    });
  }else{
    ress.json({
      type:type,
      message:"Service Provider HAS BEEN REMOVED"
    });
  }
})
  }else{
    res.json({
      type:"ERROR",
      message:message
    });
  }
});


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
>>>>>>> frontend_backend_combined

router.post('/ServiceProvider/viewPortofolio',(req,res)=>{
  if(req.decoded.type=="ServiceProvider"){
    ServiceProviderController.viewPortofolio(req,res,(err,result,type)=>{
      if(type=="ERROR"){
        res.json({
          type:type,
          message:result
        })
      }else{
        res.json({
          type:type,
          message:"YOU CAN VIEW YOUR PORTOFOLIO",
          content:result
        });
      }

    });

<<<<<<< HEAD
module.exports =router;
=======
  }else{
    res.json({
      type:"ERROR",
      message:"YOU ARE NOT A SERVICE PROVIDER"
    });
  }

});

module.exports =router;
>>>>>>> frontend_backend_combined
