let ServiceProvider = require('../db/ServiceProvider');
let Course = require('../db/Courses');
let Student = require('../db/Student');
let Admin = require('../db/Admin');
const nodemailer = require('nodemailer');


let AdminController = {


   declineSP: function(req,res,cb){ //when the admin declines a serviceprovider, the service provider is removed from the database
                                   // and an email is sent to him

      ServiceProvider.remove({email: req.body.email}, function(err, DeletedSP){

         if(err)
           {
            cb(err,"CANT REMOVE SERVICE PROVIDER","ERROR");
           }
         else{

      let transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                       user: 'seprojecta',
                       pass: 'admin@123456'
                   }
               });

         console.log('SMTP Configured');

               // setup email data with unicode symbols
               let mailOptions = {
                   from: 'seprojecta@gmail.com', // sender address
                   to: req.body.email, // list of receivers
                   subject: 'Sorry, you are not verified', // Subject line
                   text: 'Better luck next time  \n'
               };

               console.log('Sending Mail');
               // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                      cb(error,"NO EMAIL SENT","ERROR");
                   }else{
                      cb(error,"EMAIL SENT","SUCCESS");
                   }

               });
         }
      })



   },


//DONE

  viewUnregSP :function(req,res,cb){   //views all unverified service provider, those who have no username and password yet
    ServiceProvider.find({username:""}).lean().exec(function(err,unRegSP){
      if(unRegSP)
        cb(err, unRegSP, "SUCCESS");
      else
        cb(err, "No unregistered service providers are found !", "ERROR");

    });

  },



   verifySP : function(req,res,cb){//when a service provider is verified, it is assigned
          var assignedPassword = req.body.password;
          var assignedUsername = req.body.username;
          var email = req.body.email;
          var flag=false;
          // a username and password and an email is sent with those credtials
          ServiceProvider.findOne({email: req.body.email}, function(err, sp){
           if (err) {
           cb(err,"CAN NOT FIND SERVICE PROVIDER","ERROR") ;
           flag=true;
           return ;
          }
            sp.password = assignedPassword;
           sp.username = assignedUsername;

           sp.save(function(err,user) {
            if (err) {
              cb(err,"CAN NOT SAVE SERVICE PROVIDER","ERROR");
              return;
            }
           });
         });

         let transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                       user: 'seprojecta',
                       pass: 'admin@123456'
                   }
               });

         console.log('SMTP Configured');

               // setup email data with unicode symbols
               let mailOptions = {
                   from: 'seprojecta@gmail.com', // sender address
                   to: email, // list of receivers
                   subject: 'you are verified ✔', // Subject line
                   text: 'Welcome to our platform 💪'+"\n"+
                        'your username: ' + assignedUsername+"\n"+
                        "your password: "+ assignedPassword, // plain text body
               };

               // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                    console.log('Sending Mail');
                       cb(error,"CAN NOT SEND MAIL","ERROR");
                       return ;
                   }else{
                    cb(error,"CONGRATS THE MAIL HAS BEEN SENT","SUCCESS");
                    return;
                   }
                   //console.log('Message %s sent: %s', info.messageId, info.response);

               });

   },

// ViewReviews function makes the service provider able to view the reviews written about a specific course that he's providing
  ViewReviews: function(req,res){
    ServiceProvider.findOne({organizationName:req.body.organizationName}).lean().exec(function(err,SP){

    if(err)
      throw err;
    else {

      for(var i=0 ; i< SP.listOfCourses.length ; i++){
        Course.findOne({title:req.body.courseTitle},function(err,coursetitle){
          if(SP.listOfCourses[i] == courseTitle.id){
            Course.findById(courseID,function(err,course){
            for(var j = 0 ; j< course.ReviewsIDs.length ;j++){ //just return the list of reviews

                Review.findById(course.ReviewsIDs[j],function(err,review){
                  if(review==null)
                    req.flash('error_msg','No Reviews to display');
                });
              }
          });
          }
        });
      }
    }
    });

  },

   //DeleteServiceProvider function makes the admin able to delete the service provider from the system and its corresponding courses


  DeleteServiceProvider:function(req,res,cb){
    var falg = false;
    ServiceProvider.findOne({organizationName:req.body.organizationName}).lean().exec(function(err,SP){
      if(err)
        cb(err,"NO SERVICE PROVIDER FOUND","ERROR");
      else{
        if(SP.username != "" || SP.username){
          Student.find().lean().exec(function(err,students){
            if(err)
              cb(err,"ERROR IN PROCESS","ERROR");
            else{
              for(var i = 0; i < SP.listOfCourses.length; i++){
                for(var j = 0; j < students.length; j++){
                  for(var k = 0; k < students[j].ListOfCourses.length ;k++) {
                    if(students[j].ListOfCourses[k] === (SP.listOfCourses[i])){
                      var condition = {username:students[j].username};
                      var update = { $pull: { ListOfCourses: SP.listOfCourses[i] } };
                      var opts = { safe: true, upsert: true };
                      Student.update(condition,update,opts,(err,response)=>{
                        if(err)
                          cb(err,"CANT REMOVE THE COURSE FROM STUDENT LIST OF COURSE ","ERROR")
                      });
                    }
                  }
                }

            Course.remove({_id:SP.listOfCourses[i]._id},function(err){
             if(err){
              // flag=true;
              cb(err,"CANT REMOVE THE COURSE FROM SERVICE PROVIDER LIST OF COURSES","ERROR");
              return;
             }
            });
            }
            }
        });

        }else
          cb(err,"SERVICE PROVIDER WAS NOT PREVIOUSLY VERFIED","ERROR");

      //deleting service provider
      ServiceProvider.remove({organizationName:req.body.organizationName},function(err){
        if (err)
          cb(err,"ERROR","ERROR");
        else
          cb(err,"SERVICE PROVIDER HAS BEEN DELETED :(","SUCCESS");

      });
      }
    });

  },


    getAllVerifiedServiceProvider:function(req,res , cb){
       ServiceProvider.find({username:{$ne:''}},function(err,spUsers) {
        if (err) {
           cb(err,"NO SERVICE PROVIDERS","ERROR");
        } else {
        cb(err,spUsers,"SUCCESS");
    }

    });

   },
    // GetPoorServiceProvidersNotifications function notifies the admin of the poor service providers
    //existing on the system who exceeded the maximum number of bad reviews
GetPoorServiceProvidersNotifications: function(){
        var array =[];
        Admin.findOne({username:"Admin"},function(err,a){
          if (err)throw err ;

        for(var i=0;i<a.listOfNotification.length;i++){

          if(a.listOfNotification[i].typeOfNotification[0]=='B')
          array=array.concat(a.listOfNotification[i]);
        }

        if(array.length == 0)
          cb(err,"No notifications found !", "ERROR");
        else
          cb(err,array,"SUCCESS");
      // }else
      //   cb(err,"Admin is not found !", "ERROR");
    });
  }



}
module.exports = AdminController;
