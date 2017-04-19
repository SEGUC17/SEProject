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
});
//DONE
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlhc21pbiIsImlkIjoiNThmNjg4YzRmMTBmMzAxODZiOTY2NDYxIiwidHlwZSI6IlNlcnZpY2VQcm92aWRlciIsImlhdCI6MTQ5MjU1MjE3NH0.ELC0D20UgIwme05KVDG_b2jOS3Nk-kmSJlbv1p48Hko
//username:yasmin
//password:password
router.post('/forbussinus/login', function(req,res){
  ServiceProviderController.SPLogin(req,res,function(error,sp,type){
     
  if(type !="ERROR"){
  //check if match username pwd 
    var token = app.jwt.sign({ username: sp.username, id: sp._id, type:"ServiceProvider" }, app.app.get('super-secret'), {
    });
     
    res.json({
      token : token,
      ServiceProvider : sp
    });

  } else 
    res.send(sp);

  });

});
//bookCourse


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
})

//DONE

router.post('/login', function(req,res){
  StudentController.checkStudentLogin(req,res,function(error,student,type){
  if(type == "ERROR"){
     res.send(student);
  } else {
     var token = app.jwt.sign({username: student.username, id: student._id, type:type}, app.app.get('super-secret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });
  res.json({
    token : token,
    type : type
  });
  }

});

});


router.post('/register', function(req,res){

  StudentController.studentSignUP(req,res,function(error,student,type){
     if(type === "ERROR")
          res.send(student);
     else
          res.json(student);
        
});

});


//DONE

router.post('/serviceprovider/register',function(req,res){

  ServiceProviderController.spRegister(req,res,(err,sp,type)=>{
    if(type === "ERROR")
          res.send(sp);
    else
          res.send(sp); 
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


router.get('/home/viewreg',function(req,res){
  if(req.decoded.type=="Admin"){
      
  AdminController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type==="ERROR")
      res.send(sp);
    else
      res.json(sp);
         
  });

} else{
    res.json({
      type:"ERROR",
      message:"YOU ARE NOT AN ADMIN"
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


// router.post('/adminhomepage/verify', function(req,res){

//   return AdminController.verifySP(req,res);

// });



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

  

// router.post('/adminhomepage/viewunreg', function(req,res){

//   return AdminController.viewUnregSP(req,res);

// });

// router.post('/adminhomepage/decline', function(req,res){

//   return AdminController.declineSP(req,res);

// });



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
    ress.json({
      type:type,
      message:"ADMIN HAS BEEN REMOVED"
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

//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;