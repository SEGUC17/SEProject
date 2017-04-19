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




router.get('/x',function(req,res){
  res.json({
    name:"heba",
    age:90
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
  var token = app.jwt.sign({username: student.username, id: student._id, type:"Student"}, app.app.get('super-secret'), {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

  return res.json({
    success:true,
    token :token

  })

})
});

router.post('/register', function(req,res){

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
});

 router.post('/serviceprovider/register',function(req,res){
      return ServiceProviderController.spRegister(req,res);
    });


     router.get('/home/viewreg',function(req,res){
      
     ServiceProviderController.getAllVerifiedServiceProvider(req,res, function(err, sp){
          res.send(sp);
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
       return AdminController.declineSP(req,res);
    });

//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })

router.post('/me',function(req,res){
  res.send(req.decoded);
})


module.exports =router;


