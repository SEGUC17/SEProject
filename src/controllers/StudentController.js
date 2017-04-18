let Student = require('../db/Student');
let  Course = require('../db/Courses');
let Review = require('../db/Reviews');
let ServiceProvider = require('../db/ServiceProvider');
let Admin=require('../db/Admin');

let StudentController = {
//the student could book a course 
	     bookCourse :function(req, res){
          
       
        var courseTitle = req.body.title;
        var StudentID = req.session._id;
     
        Course.findOne({title : courseTitle}, function(err,result){
          console.log(result.capacity);
     
        if(err){
          console.log('Error');
        } else {
     
          course = result;
          if(result.capacity > 0){
     
     
            Student.findOne({_id : StudentID},function(err, docs){
              //console.log(docs);
              if(err)
                console.log("error");
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
                  console.log("This course is already taken by this student");
                } else {
                      var xxx = result._id;
                      console.log(xxx)

                    
                  var tempo = docs.ListOfCourses.concat([xxx]);
     
                  Student.update({_id : StudentID },{ListOfCourses : tempo }, function(err,affected) {
                      console.log('affected rows %d', affected);
                  });   
     
                  console.log("student is added to the course");
    

                  var tempoo = result.enrolledStudentsIDs.concat([StudentID]);
     
                  Course.update({title : courseTitle },{enrolledStudentsIDs : tempoo }, function(err,affected) {
                      console.log('affected rows %d', affected);
                  });
     
                  var temp = result.capacity;
                  temp = temp -1;
                  Course.update({title : courseTitle },{capacity : temp }, function(err,affected) {
                      console.log('affected rows %d', affected);
                  }); 
     
              }
     
     
            });
     
          } else
     
            console.log("No Space");
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

  Student.findOne({username:req.decoded.username}).lean().exec(function(err,student){

		console.log(student);
    if (err){
		cb(err,"ERROR","ERROR");}
 else{
	x[0]=student.username;

	 x[1]=student.profilePicture;
  //window.courses = [];
         for(var i=0; i<student.ListOfCourses.length;i++){

           Course.findById(student.ListOfCourses[i],function(err,course){


              x = x.concat([course.title]);
							if(i==student.ListOfCourses.length-1){
								console.log("GOWAA");
							cb(err,x,"SUCCESS");
						}

           });
         }
				//console.log(x);
				// console.log(array);
				 //console.log(courses);


      }
  });

},

// search function can make the student or the visitor search for a specific course by its title,type,center name,or center location 
  search:function(req,res){
 if(req.body.searchBy=='title'){

 Course.find({title:req.body.key},function(err, courses){

          if(err) throw err
      });
  }
  if(req.body.searchBy=='type'){
    Course.find({type:req.body.key},function(err, courses){

              if(err) throw err
          });
  }
  if(req.body.searchBy=='centerLocation'){
    Course.find({centerLocation:req.body.key},function(err, courses){

              if(err) throw err

          });
  }
  if(req.body.searchBy=='centerName'){
    Course.find({centerName:req.body.key},function(err, courses){

              if(err) throw err

                            });
  }
},

// typeReview function makes the student able to write a review for a course that he took
typeReview: function(req,res){
var flag =0;
Student.findById(req.sesssion._id,function(err,student){
 if(err) throw err;
  for(var i=0;i< student.ListOfCourses.length;i++){
    Course.findOne({title:req.body.courseTitle},function(err,coursetitle){


  if(student.ListOfCourses[i] == coursetitle)
  {
    flag=1;
    Course.findById(student.ListOfCourses[i]._id,function(err,course){
    var newReview = new Review({
      StudentID:req.session._id,
      review:req.body.review,
      isNeg:req.body.isNeg,
      courseID:coursetitle._id
    });
    newReview.save(function(err,newReview){
      if(err) throw err;
      req.flash('success_msg','Your review is added');
    });
    var courseTitle = course.title ;
   var array = course.ReviewsIDs.concat([newReview._id]);
    course.ReviewsIDs= array;
    if(req.body.isNeg==1){
    course.countNeg=course.countNeg+1;
    course.totalCount=course.totalCount+1;
    course.save(function(err,course){
      if(err) throw err;
    });

  if((course.countNeg/course.totalCount)>=0.5){
    ServiceProvider.findById(course.serviceProviderID,function(err,SP){

      var item = {
        typeOfNotification:"BAD REVIEWS ON **"+course.title
      }
      ServiceProvider.update(SP,{"$addToSet":{listOfNotification:item}} ,function(err,res){
        if(err)throw err;
      })

      SP.save(function(err,SP){
        if(err) throw err;
      });


            var item2={
            typeOfNotification:"BAD REVIEWS on " +course.title,
            ServiceProviderUsername:SP.username
            }

            Admin.findOne({username:"Admin"},function(err,resx){

              Admin.update(resx,{$push:{ listOfNotification :item2}},{safe:true,upsert:true},function(err,ress) {
              if(err) throw err;


            resx.save(function(err,resx){
              if(err) throw err;
            });   });
});


    });

   }
   }

  });
}
});
 }
 if(flag==0){
   req.flash('error_msg','You Can not review this course');
 }
});
},

   //the student view all the courses he is enrolled to 
       viewStudentListOfCourses : function(req, res){
          var studentID = req.session._id;

          Student.findById(studentID, function(err, StudentFound){
            console.log(StudentFound);

            for(var i = 0; i < StudentFound.ListOfCourses.length;i++){
              var CourseID=StudentFound.ListOfCourses[i];
              Course.findById(CourseID,(err,CourseFound)=>{
                if(err)
                  throw err;
                else
                  console.log(CourseFound);

              });
            }
          })

      },
  
  //student is beging signed to the system 
  studentSignUP:function(req,res){  
	  
	 
//match this student to one in the database
	  Student.findOne({ username: req.body.username }, function(err, student) 
	    {   
	    if (err) { return next(err); }
	    if (student) {                                      
	      console.log(" User already exist")    ;
	      return ;              
	    }                                                
	    var newStudent = new Student
	    ({         
	      username: req.body.username,            
	      password: req.body.password,
	      email:req.body.email,
	      birthdate:req.body.birthdate ,
	      ListOfCourses:[],
	      profilePicture:req.body.profilePicture
	     
	    });                                      

	    newStudent.save((err,StudentSaved)=>{
        if(err)
          throw err;
        else
          console.log(StudentSaved);
      });                     
	  });
	  
	}

}

module.exports = StudentController;
