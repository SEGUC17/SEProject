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
      token : token,
      ServiceProvider : sp
    });

    // console.log({
    //   token : token,
    //   ServiceProvider : sp
    // }.token);

    //  console.log({
    //   token : token,
    //   ServiceProvider : sp
    // }.ServiceProvider.username);

  } else 
    res.send(sp);

  });

});

router.post('/adminhomepage/verify', function(req,res){

  return AdminController.verifySP(req,res);

});


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




router.get('/home/viewreg',function(req,res){
      
  ServiceProviderController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
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



// router.post('/adminhomepage/verify', function(req,res){

//   return AdminController.verifySP(req,res);

// });



// router.post('/ServiceProvider/courses/removeCourse',function(req,res){

//   console.log(re.decoded);
//    return ServiceProviderController.removeCourse(req,res);

// });



router.post('/ServiceProvider/courses/addCourse',function(req,res){
  console.log(req.decoded);
  if(req.decoded.type=="ServiceProvider"){
  ServiceProviderController.addCourse(req,res,(err,course,type)=>{
    if(type=="ERROR")
      res.send(course);
    else 
      res.json(course);
  });
}else{
  res.send("YOU ARE NOT A SERVICE PROVIDER ");
}
     
});

  

// router.post('/adminhomepage/viewunreg', function(req,res){

//   return AdminController.viewUnregSP(req,res);

// });

// router.post('/adminhomepage/decline', function(req,res){

//   return AdminController.declineSP(req,res);

// });

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

//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;