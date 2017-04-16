let ServiceProvider = require('../db/ServiceProvider');
let Course = require('../db/Courses');
let Student = require('../db/Student');
let Admin = require('../db/Admin');
const nodemailer = require('nodemailer');


let AdminController = {

   declineSP: function(req,res){ //when the admin declines a serviceprovider, the service provider is removed from the database 
                                   // and an email is sent to him

      ServiceProvider.remove({email: req.body.email}, function(err, DeletedSP){
         if(err)
            console.log(err);
         else{
            console.log("deleted");
         }
      })

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
                   to: SPemail, // list of receivers
                   subject: 'Sorry, you are not verified', // Subject line
                   text: 'Better luck next time  \n'
               };
               
               console.log('Sending Mail');
               // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                       return console.log(error);
                   }
                   console.log('Message %s sent: %s', info.messageId, info.response);

               });


   },


 viewUnregSP :function(){   //views all unverified service provider, those who have no username and password yet
          ServiceProvider.find({username:""}).lean().exec(function(err,unRegSP)
            {
             if(err)
             {
              throw err;
             }
             else
             {
           var i;
              for ( i =0; i < unRegSP.length ; i++) 
              {
        
            console.log(unRegSP[i])
              }
             }

            });

      },

   verifySP : function(req,res)//when a service provider is verified, it is assigned 
            { 
                  
          var assignedPassword= req.body.assignedPassword;
          var assignedUsername=req.body.assignedUsername;                                             // a username and password and an email is sent with those credtials
          ServiceProvider.findOne({email: req.body.email}, function(err, sp){
           if (err) { 
            return 
           res.json({
            success:false,
            Message:"ERROR"
           }) 
         }

           sp.password = req.body.assignedPassword;
           sp.username = req.body.assignedUsername;
           sp.save(function(err,user) {

             if (err) { 
              return res.json({
            success:false,
            Message:"ERROR"
           })  
            }else
             console.log(user);
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
         var SPemail=req.body.SPemail;

               // setup email data with unicode symbols
               let mailOptions = {
                   from: 'seprojecta@gmail.com', // sender address
                   to: SPemail, // list of receivers
                   subject: 'you are verified ✔', // Subject line
                   text: 'Welcome to our platform 💪'+"\n"+
                        'your username: ' + assignedUsername+"\n"+
                        "your password: "+ assignedPassword, // plain text body
               };
               
               console.log('Sending Mail');
               // send mail with defined transport object
               transporter.sendMail(mailOptions, (error, info) => {
                   if (error) {
                       return res.json({
                        success:false,
                        Message:"mail can not be sent"
                       })
                   }
                   console.log('Message %s sent: %s', info.messageId, info.response);
                     return res.json({
                        success:true,
                        Message:'Message sent'
                       })

               });


   },

   //DeleteServiceProvider function makes the admin able to delete the service provider from the system and its corresponding courses
  DeleteServiceProvider:function(req,res){

ServiceProvider.findOne({organizationName:req.body.organizationName}).lean().exec(function(err,SP){

Student.find().lean().exec(function(err,students){
  for(var i=0;i<SP.listOfCourses.length;i++){

for(var j=0;j<students.length;j++){
  for(var k=0;k<students[j].ListOfCourses.length;k++) {
    if(students[j].ListOfCourses[k]==(SP.listOfCourses[i])){
      var condition={username:students[j].username};
      var update={ $pull: { ListOfCourses: SP.listOfCourses[i] } };
      var opts= { safe: true, upsert: true };
    Student.update(condition,update,opts,(err,response)=>{
    if(err) throw err;
   });
 }
  }

}
Course.remove({_id:SP.listOfCourses[i]._id},function(err)
{
 if (err) throw err;

});
}
});

//deleting service provider
ServiceProvider.remove({organizationName:req.body.organizationName},function(err)
{
   if (err) throw err;
});
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
        console.log(array);
        return array;
        });
      }

}

module.exports = AdminController;