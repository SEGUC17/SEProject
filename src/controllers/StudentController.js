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
  
      Student.findOne( {username :req.body.username },function(err1, studentuser) {
        if (err1) {
          console.log(err1);

        }

        if(!studentuser)
             console.log("user not found");
     
    //else
      studentuser.checkPassword (req.body.password, function(err2,isMatch){

        if(isMatch && isMatch==true){
           return  console.log("you are logged in");
          }else
           return  console.log("wrong password");
           cb(studentuser, err2);

       });
          
       
          
   });

  },
 // getAllCourses function Display all provided courses 
  getAllCourses:function(){

      Course.find(function(err, courses){

           if(err) throw err;
          else
          console.log({courses});
      });
    },

//getStudentProfile function displays for the student his username,profile pictures and his list of courses

   getStudentProfile : function(req,res) {
    var array=[];
  Student.findOne({username:req.session.username}).lean().exec(function(err,student){
    if (err) throw err
 else {
         for(var i=0;i<student.ListOfCourses.length;i++){
           Course.findById(student.ListOfCourses[i]._id,function(err,course){
             array = array.concat([course.title]);
           })
         }
      }
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
	var w=[];
  Student.findById(req.decoded.id,function(err,student){
   if(err)
	 cb(err,"ERROR","ERROR");
	 Course.findOne({title:req.body.courseTitle},function(err,c){
		 if(err)
		 cb(err,"ERROR","ERROR");

 var courseID=c.id;
var f=0;

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



var n=[];
			for(var i=0;i<course.ReviewsIDs.length;i++){
		 	 Review.findById(course.ReviewsIDs[i],function(err,rouu){
		 		 n = n.concat([rouu.isNeg]);
		 	 });
		  }
		 cb(err,n,"SUCCESS");
console.log(n);




		  var courseTitle = course.title ;
		 var array = course.ReviewsIDs.concat([newReview.id]);
		  course.ReviewsIDs= array;
		  if(req.body.isNeg==1){
		  course.countNeg=course.countNeg+1;
		  course.totalCount=course.totalCount+1;
		  course.save(function(err,course){
		    if(err) cb(err,"ERROR","ERROR");
		  });

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
							});		});
});


		  });

		 }
	   }

	  });
	}

   }

	 if(f==0)
	 cb(err,"You can't review this course","ERROR");
 });
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
  ViewCourseReviews:function(req,res,cb){

	var array=[];
Student.findOne({username:req.decoded.username}).lean().exec(function(err,student){

if(err)
cb(err,"ERROR","ERROR");
  else {

for(var i=0 ; i< student.ListOfCourses.length ; i++){
  Course.findOne({title:req.body.courseTitle},function(err,coursetitle){
  if(student.ListOfCourses[i] == courseTitle.id){
    Course.findById(courseID,function(err,course){

    for(var j = 0 ; j< course.ReviewsIDs.length ;j++){ //just return the list of reviews

      Review.findById(course.ReviewsIDs[j],function(err,review){
      if(review==null)
   array=array.concat([review]);
        });
      }

			cb(err,array,"SUCCESS");
     });
   }
 });
}
 }
});},
  //student is beging signed to the system
  studentSignUP:function(req,res, cb){

//match this student to one in the database
	  Student.findOne({ username: req.body.username }, function(err1, student)
	    {
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

      /*newStudent.save((err2,newStudent)=>{
        if(err2){
      //     cb(err2,"ERROR","ERROR");
		}*/
				newStudent.save(function(err,student){
					if(err)
					  cb(err,"ERROR","ERROR");
				else{
          console.log(student);
        cb(err,student,"SUCCESS");
      }
      });

      }
	    else{

	      console.log(" User already exist");
        cb(err1,"USERNAME ALREADY EXIST","ERROR");

	    }



	  });

	}

}

module.exports = StudentController;
