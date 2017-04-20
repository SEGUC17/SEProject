let Student = require('../db/Student');
let  Course = require('../db/Courses');
let Review = require('../db/Reviews');
let ServiceProvider = require('../db/ServiceProvider');
let Admin=require('../db/Admin');
 
gl=[];
glo=[];
glo2=[];
 
let StudentController = {
//the student could book a course
 
  bookCourse :function(req, res,cb){
    var courseTitle = req.body.title;
    var StudentID = req.decoded.id;
 
    Course.findOne({title : courseTitle}, function(err,result){
      //console.log(result.capacity);
 
      if(err)
        cb(err,"CANT FIND THE COURSE","ERROR");
      else{
        course = result;
        if(result.capacity > 0){
          Student.findById({_id : StudentID},function(err, docs){
              //console.log(docs)
            if(!docs || err)
              cb(err,"CANT FIND THE STUDENT","ERROR");
            else{
 
              var found = 5;
 
              for(var i = 0; i < docs.ListOfCourses.length; i++){
                if(docs.ListOfCourses[i].toString() == result._id){
                  found = -100;
                  break;
                }
              }
            }
 
                if(found < 0){
 
                  cb(err,"THIS COURSE IS ALREADY TAKEN BY YOU","ERROR");
                } else {
                      var xxx = result._id;
                      console.log(xxx)
 
 
                  var tempo = docs.ListOfCourses.concat([xxx]);
 
                  Student.update({_id : StudentID },{ListOfCourses : tempo }, function(err,affected) {
                      console.log('affected rows %d', affected);
                  });
 
                  cb(err,"student is added to the course","SUCESS");
 
                  var tempoo = result.enrolledStudentsIDs.concat([StudentID]);
 
                  Course.update({title : courseTitle },{enrolledStudentsIDs : tempoo }, function(err,affected) {
                      //console.log('affected rows %d', affected);
                  });
 
                  var temp = result.capacity;
                  temp = temp -1;
                  Course.update({title : courseTitle },{capacity : temp }, function(err,affected) {
                      //console.log('affected rows %d', affected);
                  });
 
              }
 
 
            });
 
          } else
 
            cb(err,"No Space","ERROR");
        }
 
      });
 
    },
 
 
//ckecks tht this student was previously signed up or not
    checkStudentLogin:function(req,res,cb) {
      if(req.body.username === "Admin" || req.body.username === "admin" || req.body.username === "mariam"){
        Admin.findOne({username: req.body.username },(err,admin)=>{
 
          if(err){
            cb(err,"ERROR","ERROR");
          }else{
            if(admin){
              admin.checkPassword (req.body.password,(err2,isMatch)=>{
              if(err2){
                cb(err,"ERROR","ERROR");
              }else{
 
                  if(isMatch && isMatch==true){
                     console.log("right");
                     cb(err,admin,"Admin");
                    // cb(err2,student,"SUCCESS");
                    }else{
                       cb(err2,"WRONG PASSWORD","ERROR");
                    }
 
 
            }
            });
          }else {
 
            cb(err,"USERNAME NOT FOUND","ERROR")
 
          }
          }
 
        })
      }else{
        Student.findOne({username :req.body.username },(err,student)=>{
 
          if(err){
            cb(err,"ERROR","ERROR");
          }else{
            if(student){
            student.checkPassword (req.body.password,(err2,isMatch)=>{
              if(err2){
                cb(err,"ERROR","ERROR");
              }else{
 
                  if(isMatch && isMatch==true){
                     console.log("right");
                       cb(err,student,"Student");
                    // cb(err2,student,"SUCCESS");
                    }else{
                       cb(err2,"WRONG PASSWORD","ERROR");
                    }
 
 
            }
            });
 
          }else{
            cb(err,"USERNAME NOT FOUND","ERROR")
          }
        }
        });
      }
 
  },
 // getAllCourses function Display all provided courses
  getAllCourses:function(req,res,cb){
 
      Course.find(function(err, courses){
 
           if(err)
           cb(err,"ERROR","ERROR");
          else
        cb(err,courses,"SUCCESS");
      });
    },
 
//getStudentProfile function displays for the student his username,profile pictures and his list of courses
     //var courses =[];
   getStudentProfile : function(req,res,cb) {
  var indx=2;
  Student.findOne({username:req.decoded.username}).lean().exec(function(err,student){
   for(var i=0; i<student.ListOfCourses.length;i++){
 
     Course.findById(student.ListOfCourses[i],function(err,course){
       //console.log(course);
 
         //glo.push(course.title);
          glo[indx] = course.title;
            indx++;
 
 
      });
 
 
}
glo[0]=student.username;
glo[1]=student.profilePicture;
 
 
  cb(err,glo,"SUCCESS");
  for(var w=glo.length-1;w>=0;w--){
  glo.pop();}
 
         });
       },
 
// search function can make the student or the visitor search for a specific course by its title,type,center name,or center location
  search:function(req,res,cb){
 if(req.body.searchBy=='title'){
 
 Course.find({title:req.body.key},function(err, courses){
 
          if(err)
          cb(err,"ERROR","ERROR");
          else {
            cb(err,courses,"SUCCESS");
          }
      });
  }
  if(req.body.searchBy=='type'){
    Course.find({type:req.body.key},function(err, courses){
 
              if(err)
              cb(err,"ERROR","ERROR");
              else {
                cb(err,courses,"SUCCESS");
              }
          });
  }
  if(req.body.searchBy=='centerLocation'){
    Course.find({centerLocation:req.body.key},function(err, courses){
 
              if(err)
              cb(err,"ERROR","ERROR");
              else {
                cb(err,courses,"SUCCESS");
              }
 
          });
  }
  if(req.body.searchBy=='centerName'){
    Course.find({centerName:req.body.key},function(err, courses){
 
              if(err)
              cb(err,"ERROR","ERROR");
              else {
                cb(err,courses,"SUCCESS");
              }
 
                 });
  }
},
 
 // typeReview function makes the student able to write a review for a course that he took
 
 
typeReview: function(req,res,cb){
 
  var ind=0;
  var f=0;
  Student.findById(req.decoded.id,function(err,student){
   if(err)
   cb(err,"ERROR","ERROR");
 
   Course.findOne({title:req.body.courseTitle},function(err,c){
 
     if(err)
     cb(err,"ERROR","ERROR");
 
 var courseID=c.id;
 
    for(var i=0;i< student.ListOfCourses.length;i++){
    if(student.ListOfCourses[i] == courseID)
    {
      f=1;
      Course.findById(student.ListOfCourses[i],function(err,course){
      var newReview = new Review({
        StudentID:req.decoded.id,
        review:req.body.review,
        isNeg:req.body.isNeg,
        courseID:courseID
      });
      newReview.save(function(err,newReview){
        if(err)
        cb(err,"ERROR","ERROR");
 
 
      });
 
 
 
 
      var courseTitle = course.title ;
     var array = course.ReviewsIDs.concat([newReview.id]);
      course.ReviewsIDs= array;
      if(req.body.isNeg==1){
      course.countNeg=course.countNeg+1;
      course.totalCount=course.totalCount+1;
      course.save(function(err,course){
        if(err) cb(err,"ERROR","ERROR");
      });}
else{
course.totalCount=course.totalCount+1;
      course.save(function(err,course){
        if(err) cb(err,"ERROR","ERROR");
      });
}
 
 
 
    if(req.body.isNeg==1){
    if((course.countNeg/course.totalCount)>=0.5){
      ServiceProvider.findById(course.serviceProviderID,function(err,SP){
       // SP.listOfNotification=SP.listOfNotification.concat(course.title+" has exceeded the maximum number of negative reviews");
        var item = {
          typeOfNotification:"BAD REVIEWS ON **"+course.title
        }
        ServiceProvider.update(SP,{"$addToSet":{listOfNotification:item}} ,function(err,res){
          if(err)
        cb(err,"ERROR","ERROR");
        })
 
 
//console.log(SP.listOfNotification.typeOfNotification);
        SP.save(function(err,SP){
          if(err) cb(err,"ERROR","ERROR");
        });
 
 
              var item2={
              typeOfNotification:"BAD REVIEWS on " +course.title,
              ServiceProviderUsername:SP.username
              }
 
              Admin.findOne({username:"Admin"},function(err,resx){
 
                Admin.update(resx,{$push:{ listOfNotification :item2}},{safe:true,upsert:true},function(err,ress) {
                if(err)
              cb(err,"ERROR","ERROR");
 
              resx.save(function(err,resx){
                if(err) cb(err,"ERROR","ERROR");
              });   });
});
 
 
      });
 
     }
   }
    });
}
}if(f==0)
cb(err,"You can't review this course","ERROR");
else{
   Review.find({courseID:courseID},function(err,reviews){
if(err)
  cb(err,"ERROR","ERROR");
else
 cb(err,reviews,"SUCCESS");
  });
}
 
    });
 
  });
 
 
 
 },
/*
   //the student view all the courses he is enrolled to
       viewStudentListOfCourses : function(req, res,cb){
          var studentID = req.decoded.id;
 
          Student.findById(studentID, function(err, StudentFound){
            console.log(StudentFound);
 
            for(var i = 0; i < StudentFound.ListOfCourses.length;i++){
              var CourseID=StudentFound.ListOfCourses[i];
              Course.findById(CourseID,(err,CourseFound)=>{
                if(err)
                  cb(err,"ERROR","ERROR");
                else
                  console.log(CourseFound);
 
              });
            }
          })
 
      },*/
 
  //student is beging signed to the system
  studentSignUP:function(req,res, cb){
 
//match this student to one in the database
 
    Student.findOne({ username: req.body.username }, function(err1, student){
      if (!student) {
          var newStudent = new Student
            ({
              username: req.body.username,
              password: req.body.password,
              email:req.body.email,
              birthdate:req.body.birthdate ,
              ListOfCourses:[],
              profilePicture:req.body.profilePicture
 
            });
 
        newStudent.save(function(err,student){
          if(err)
            cb(err,"ERROR CAN NOT SAVE ","ERROR"); 
        else
        cb(err,student,"SUCCESS");
      });
 
      }else{
 
        console.log(" User already exist");
        cb(err1,"USERNAME ALREADY EXIST","ERROR");
 
      }
 
 
 
    });
 
  }
 
}
 
module.exports = StudentController;