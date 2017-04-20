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

// router.post('/ServiceProvider/courses/removeCourse',function(req,res){
//   console.log(re.decoded);
//   return ServiceProviderController.removeCourse(req,res);
// });
//
// router.post('/ServiceProvider/courses/addCourse',function(req,res){
// 	console.log(req.decoded);
// 	return ServiceProviderController.addCourse(req,res);
// });


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
  if(type=="ERROR"){
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

router.get('/home/viewreg',function(req,res){
 // console.log("hiiiiiiiiiiiiiiiii")
  AdminController.getAllVerifiedServiceProvider(req,res, function(err,sp,type){
    if(type==="ERROR")
      res.send(sp);
    else
      res.json(sp);
  });
});
//end ----later they will be moved under middleware

router.get('/',function (req,res){
        res.sendFile(path.join(__dirname,'../','app','index.html'))
});

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



//  router.get('*',function (req,res){
//         res.sendFile(path.join(__dirname,'../','app','index.html'))
// })


module.exports =router;
