let Student = require('../db/Student');
let  Course = require('../db/Courses');
let Review = require('../db/Reviews');
let ServiceProvider = require('../db/ServiceProvider');
let Admin=require('../db/Admin');

let StudentController = {
//the student could book a course 
	    bookCourse :function(courseTitle,StudentID){
    
     //find the course by matchin  the course ttilte 
        Course.findOne({title : courseTitle}, function(err,result){
          console.log(result.capacity);
     
        if(err){
          console.log('Error');
        } else {
     //check the capacity of the course is greater than zero
          course = result;
          if(result.capacity > 0){
     
     //find the student by his id 
            Student.findOne({_id : StudentID},function(err, docs){
              if(err)
                console.log("error");
              else{
     
                var found = 5;
                //checking if this student is previously registerd to the course or not 
                for(var i = 0; i < docs.ListOfCourses.length; i++){
                  if(docs.ListOfCourses[i].toString() == result._id){
                    found = -100;
                    break;
                  }
                }
              }
     
     //if prviously registerd to this course print the message 
                if(found < 0){
                  console.log("This course is already taken by this student");
                } else {
                	//else add the student to the thjis course by adding the course id to the list of courseid of the student and adding the student id to the list of enrolled students of the cours e
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
    checkStudentLogin:function(username,password) {
  
      Student.findOne( {username :username },function(err, studentuser) {
        if (err) {
          console.log(err);
        }

        if(!studentuser)
             console.log("user not found");
     
    
    
      studentuser.checkPassword (password, function(err,isMatch){
        if(isMatch && isMatch==true){
           return  console.log("you are logged in");
          }else
           return  console.log("wrong password");
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
    getStudentProfile : function(name) {
    Student.findOne({username:name}).lean().exec(function(err,student){
      if (err) throw err
   else {
              console.log(student.username);
      console.log(student.profilePicture);
        console.log(student.ListOfCourses);
               }
    });

  },


// search function can make the student or the visitor search for a specific course by its title,type,center name,or center location 
  search:function(key, searchBy){
   if(searchBy=='title'){

   Course.find({title:key},function(err, courses){

            if(err)
              //  res.send(err.message);
              throw err
            else
              //  res.render('searchPage' , {coursesRequired : courses});
               console.log({courses});
        });
    }
    if(searchBy=='type'){
      Course.find({type:key},function(err, courses){

                if(err) throw err

                else
                 console.log({courses});

            });
    }
    if(searchBy=='centerLocation'){
      Course.find({centerLocation:key},function(err, courses){

                if(err) throw err

                else
                 console.log({courses});

            });
    }
    if(searchBy=='centerName'){
      Course.find({centerName:key},function(err, courses){

                if(err) throw err

                else
                 console.log({courses});
                              });
    }
},


// typeReview function makes the student able to write a review for a course that he took
typeReview: function(StudentID,text,flag,courseID){
  Student.findById({_id:StudentID},function(err,student){
   if(err) throw err;
    for(var i=0;i< student.ListOfCourses.length;i++){
		if(student.ListOfCourses[i] == courseID)
		{
		  Course.findById(student.ListOfCourses[i],function(err,course){
		  var newReview = new Review({
		    StudentID:StudentID,
		    review:text,
		    isNeg:flag,
		    courseID:courseID
		  });
		  newReview.save(function(err,newReview){
		    if(err) throw err;
		    console.log("review added");
		  });
		  var courseTitle = course.title ;
		  console.log(newReview.id);
		 var array = course.ReviewsIDs.concat([newReview.id]);
		  course.ReviewsIDs= array;
		  if(flag==1){
		  course.countNeg=course.countNeg+1;
		  course.totalCount=course.totalCount+1;
		  course.save(function(err,course){
		    if(err) throw err;
		    console.log("D");
		  });

		if((course.countNeg/course.totalCount)>=0.5){

		   console.log(course.title);
		   console.log(course.serviceProviderID);
		  ServiceProvider.findById(course.serviceProviderID,function(err,SP){
		    var item = {
					typeOfNotification:"BAD REVIEWS ON **"+course.title
				}
				ServiceProvider.update(SP,{"$addToSet":{listOfNotification:item}} ,function(err,res){
					if(err)
						console.log(err);
					else
						console.log("updated")
				})

					SP.save(function(err,SP){
			      if(err) throw err;
			      console.log(SP);
			    });


					var item2={
					typeOfNotification:"BAD REVIEWS on " +course.title,
					ServiceProviderUsername:SP.username
					}

					Admin.findOne({username:"Admin"},function(err,resx){
						console.log(resx)
						Admin.update(resx,{$push:{ listOfNotification :item2}},{safe:true,upsert:true},function(err,ress) {
						if(err)
							console.log(err);
						else
							console.log("updated")




					resx.save(function(err,resx){
						if(err) throw err;
						console.log(resx);
					});		});
            });


		  });

		 }
	   }

	  });
	}

   }

  });
},

   //the student view all the courses he is enrolled to 
      viewStudentListOfCourses : function(studentID){
          
// find student by his id 
          Student.findById({_id:studentID}, function(err, StudentFound){
            console.log(StudentFound);
            //get  all his enrolled in courses 
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
  studentSignUP:function(profilePicture,email,username,ListOfCourses,birthdate,password)
	 {  
	  
	 
//match this student to one in the database
	  Student.findOne({ username: username }, function(err, student) 
	    {   
	    if (err) { return next(err); }
	    if (student) {                                      
	      console.log(" User already exist")    ;
	      return ;              
	    }                                                
	    var newStudent = new Student
	    ({         
	      username: username,            
	      password: password,
	      email:email,
	      birthdate:birthdate ,
	      ListOfCourses:ListOfCourses,
	      profilePicture:profilePicture
	     
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