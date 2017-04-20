var express = require('express');
var router = express.Router();
var Course=require('./db/Courses');
var ServiceProvider=require('./db/ServiceProvider.js');
var Admin=require('./db/Admin');
var StudentController = require('./controllers/StudentController');
var ServiceProviderController = require('./controllers/ServiceProviderController');
var AdminController = require('./controllers/AdminController');

var app = require('./server.js');

var path = require('path');



router.get('/',function (req,res){
        res.sendFile(path.join(__dirname,'../','app','index.html'))
});

router.get('/home/viewreg',function(req,res){

  AdminController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type === "ERROR")
      res.json({
        type : type,
        message : sp
      });
    else
      res.json({
        type : type,
        content : sp});

      });

});

// start --- later they will be moved under middleware
router.post('/ServiceProvider/courses/removeCourse',function(req,res){
  console.log(re.decoded);
  return ServiceProviderController.removeCourse(req,res);
});

router.post('/adminhomepage/verify', function(req,res){
  if(req.decoded.type=="Admin"){
    AdminController.verifySP(req,res,(err,message,type)=>{
      if(type=="ERROR")
        res.json({
          type : type,
          message : message
        });
      else
        res.json({
          type : type,
          message : "SERVICE PROVIDER HAS BEEN SUCCESSFULLY REGISTERED",
          content : message
        });

    });

  }else{
    res.json({
      type:"ERROR",
      message:"YOU ARE NOT AN ADMIN"
    });
  }
});
  return AdminController.declineSP(req,res);

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
    res.json({
      type:type,
      message:"SERVICE PROVIDER HAS BEEN REMOVED"
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
//end ----later they will be moved under middleware

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


// malhash lazma
router.post('/admin/clearUnverfiedSP',(req,res)=>{
  ServiceProviderController.clearUNverSP(req,res,(err,result,type)=>{
    if(type=="ERROR"){
      res.send(result);
    }else{
      res.json(result);
    }

  });

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


router.post('/login', function(req,res){
  StudentController.checkStudentLogin(req,res,function(error,message,type){
    if(type == "ERROR")
      res.json({
        type : type,
        message : message
      });
    else {
      var token = app.jwt.sign({username: message.username, id: message._id, type:type}, app.app.get('super-secret'), {});

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



router.use(function(req,res,next){ //this middleware adds the decoded token the req before continuing to any other routes
                                   //so if you need to access an attribute saved in the token,
                                   //use req.decoded.attrName
  var token = req.body.token || req.headers['x-access-token'] || req.body.query;

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



router.post('/me',function(req,res){
  res.json({
    token:req.headers['x-access-token'],
    decoded:req.decoded
  });
});


// router.get('/home/viewreg',function(req,res){
//
//   AdminController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
//     if(type === "ERROR")
//       res.json({
//         type : type,
//         message : sp
//       });
//     else
//       res.json({
//         type : type,
//         content : sp});
//
//       });
//
// });
//
//
// router.post('/adminhomepage/verify', function(req,res){
//   if(req.decoded.type=="Admin"){
//     AdminController.verifySP(req,res,(err,message,type)=>{
//       if(type=="ERROR")
//         res.json({
//           type : type,
//           message : message
//         });
//       else
//         res.json({
//           type : type,
//           message : "SERVICE PROVIDER HAS BEEN SUCCESSFULLY REGISTERED",
//           content : message
//         });
//
//     });
//
//   }else{
//     res.json({
//       type:"ERROR",
//       message:"YOU ARE NOT AN ADMIN"
//     });
//   }
// });
//   return AdminController.declineSP(req,res);

// });



// router.post('/admin/declineSP',function(req,res){
//   if(req.decoded.type=="Admin"){
//     AdminController.declineSP(req,res,(err,message,type)=>{
//       if(err){
//         res.json({
//           type:type,
//           message:message
//         });
//       }else{
//         res.json({
//           type:type,
//           message:"SERVICE PROVIDER HAS BEEN DECLINED",
//           content:message
//         });
//       }
//
//     });
//   }else{
//     res.json({
//       type:"ERROR",
//       message:"YOU ARE NOT AN ADMIN"
//     });
//   }
// });
// router.post('/admin/deleteSP',function(req,res){
//   if(req.decoded.type=="Admin"){
// AdminController.DeleteServiceProvider(req,res,(err,message,type)=>{
//   if(type=="ERROR")
//   {
//     res.json({
//       type:type,
//       message:message
//     });
//   }else{
//     res.json({
//       type:type,
//       message:"SERVICE PROVIDER HAS BEEN REMOVED"
//     });
//   }
// })
//   }else{
//     res.json({
//       type:"ERROR",
//       message:message
//     });
//   }
// });
// router.post('/adminhomepage/viewunreg', function(req,res){
//   if(req.decoded.type == "Admin"){
//     AdminController.viewUnregSP(req,res,function(err,message,type){
//       if(type === "ERROR")
//         res.json({
//           type : type,
//           message : message
//         });
//       else
//         res.json({
//           type : type,
//           content : message
//         });
//     });
//   }else
//     res.json({
//       type : "ERROR",
//       message : "You are not an admin !"
//     });
// });


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
        res.json({
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

  }else{
    res.json({
      type:"ERROR",
      message:"YOU ARE NOT A SERVICE PROVIDER"
    });
  }

});


router.post('/adminhomepage/getNotifications',function(req,res){
  if(req.decoded.type = "Admin"){

    AdminController.getNotifications(req,res,function(err,message,type){
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


router.post('/serviceprovider/getNotifications',function(req,res){
  if(req.decoded.type = "ServiceProvider"){

    AdminController.getNotifications(req,res,function(err,message,type){
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
      message : "You are not a service provider !"
    });

});


router.post('/studentprofile',function(req,res){
  if(req.decoded.type=="Student"){
    StudentController.getStudentProfile(req,res,(err,prof,type)=>{
      if(type == "ERROR")
        res.json({
          type:type,
          message:prof,
        });
      else
        res.json({
          type:type,
          message:"STUDENT PROFILE RETREIVED",
          content:prof
        });
    });

  }else
    res.json({
      type:"ERROR",
      message:"You are not a student !"

    });

});


router.post('/studentprofile/review',function(req,res){
  if(req.decoded.type=="Student"){


    StudentController.typeReview(req,res,(err,review,type)=>{
      if(type === "ERROR")
        res.json({
          type:type,
          message:review
        });
      else
        res.json({
          type:type,
          message:"Review added",
          content:review
        });

    });
  }else
    res.json({
      type:"ERROR",
      message:"You are not a student !"
    });
});



router.get('/home/catalog',function(req,res){
  StudentController.getAllCourses(req,res,(err,courses,type)=>{
    if(type === "ERROR")
      res.json({
        type:type,
        message:courses
      });
    else
      res.json({
        type:type,
        message:"ALL COURSES",
        content:courses
      });
  });

});


router.post('/home/search',function(req,res){
  StudentController.search(req,res,(err,course,type)=>{
    if(type === "ERROR")
      res.json({
        type:type,
        message:course
      });
    else
      res.json({
        type:type,
        content:course,
        message:"course retrieved"
      });

  });


});




//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;
