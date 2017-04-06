var Course =require('../db/Courses');
var ServiceProvider = require('../db/ServiceProvider');
var Student = require('../db/Student');
var Admin = require('../db/Admin');
var Review = require('../db/Reviews');

let ServiceProviderController = {


    clearUNverSP: function(){
       ServiceProvider.remove(function(err){
       	if(err)
       		console.log(err);
       	else
       		console.log("cleared");
       });
    },


// Service Provider can create or update his protofiolo
	createAndUpdatePortofolio : function (ServiceProviderID,password,field,description,mobileNumber,email,address,polices,logo) {
		 
//parameteres to be updated
		var toBeUpdated = {
			password :password,
		    field :field,
			description :description,
			mobileNumber :mobileNumber,
			email :email,
			address :address,
			polices :polices,
			logo :logo
		};
		//service provider is found by his id 

		ServiceProvider.findById(ServiceProviderID, function(err,docs) {
			if(err)
				console.log(err);
			else {
				//the service provider is Updated
				ServiceProvider.update({_id : ServiceProviderID}, toBeUpdated, function(err,res){
					if(err){
						console.log(err);
					}else
						console.log('updated');

				})

			}
		
		});

	},

	//the service provider can add a course and passing his Id 

	addCourse:function(serciveProviderIDSession,courseTitle,centerName,centerLocation,type,description,startDate,endDate,capacity,announcement,fees,enrolledStudents){

//the the new course parameters 
		var newCourse=new Course({
				title:courseTitle,
				centerName:centerName,
				centerLocation:centerLocation,
				type:type,
				description:description,
				startDate:startDate,
				endDate:endDate,
				capacity:capacity,
				announcement:announcement,
				fees:fees,
				enrolledStudents:enrolledStudents,
				serviceProviderName:serciveProviderIDSession
				
			});
		
///the new course is saved to the database 
	newCourse.save((err,savedCourse)=>{
		if(err){
			console.log('Cant save the Course');
			throw err;
		}else{
			//the service provider is searched for
		   		ServiceProvider.findById(serciveProviderIDSession,(err,ServiceProviderResult)=>{
		   		if(err){
		   			console.log('error in the addCourse Function :(');
		   			throw err;
		   		}else{
		   		console.log('Service Provider Found :)');
		   		console.log(ServiceProviderResult);
		   		console.log(savedCourse._id);
		   		var cousreid=savedCourse._id;
		   		var lengthofCourse=ServiceProviderResult.listOfCourses.length;
		   		console.log('Length');
		   		console.log(lengthofCourse);
		   		var found=0;
//checks that this course was not added before
		   		for(var i=0;i<lengthofCourse;i++){
		   			if(ServiceProviderResult.listOfCourses[i]==cousreid)
		   			{
		   				console.log('this course has been added before SORRY');
		   				found=1;
		   				break;
		   			}
		   		}
		   		if(found==0){
		   			//the new course id is added to the list of courses that is service provider provides
		   		ServiceProviderResult.listOfCourses.push(cousreid);
		   		ServiceProviderResult.save();
		   		console.log('After the push FINALLY');
		   		lengthofCourse=ServiceProviderResult.listOfCourses.length;
		   		console.log('Length');
		   		console.log(lengthofCourse);
		   		console.log(ServiceProviderResult);
		   	}
				}
		   	});
		   }
		  });

		},
//service provider removes a course by passong in the parameter and his id
		removeCourse: function(courseTitleToBeRemoved,serciveProviderIDSession){
 //service provider is found by his id 
			ServiceProvider.findById(serciveProviderIDSession,(err,serviceProviderFound)=>{
				if(err){
					console.log('service provider cant be found ');
					throw err;
				}else{
			var serviceProviderListCoursesLength=serviceProviderFound.listOfCourses.length;
			console.log(serviceProviderListCoursesLength);
			//the course is being removed for the list of enrolled students 
			Course.findOne({title:courseTitleToBeRemoved},(err,resultCourse)=>{
				if(err){
					throw err;
				}else{
					var xx = resultCourse.enrolledStudentsIDs.length;
 	                 console.log(xx);
					for(var i=0;i<xx;i++){
						var StudentIDtoBeFound=resultCourse.enrolledStudentsIDs[i];
						console.log(resultCourse);
						console.log('Student ID will be:')
						console.log(StudentIDtoBeFound);
						Student.findById(StudentIDtoBeFound,(err,studentFound)=>{
							var condition={username:studentFound.username};
							console.log('STUDENT FOUND USERNAME :');
							console.log(condition);
							var iddd=resultCourse._id;
							console.log('COURSE ID SAVED IN THE STUDENT LIST');
							console.log(iddd);
							var update={ $pull: { ListOfCourses: iddd } };
 
							var opts= { safe: true, upsert: true };
						Student.update(condition,update,opts,(err,response)=>{
						if(err)
								throw err;
							else{
					console.log('FINALLY REMOVED FROM THE STUDENT LIST');
					console.log(response);
 
							}
 
						});
				});
			 }
			}
			//the course is removed from the database
			resultCourse.remove((err)=>{
				if(err)
				throw err;
			});
			var condition={username:serviceProviderFound.username};
			console.log('SERVICE PROVIDER USERNAME :');
			console.log(condition);
			var iddd=resultCourse._id;
			console.log('COURSE ID SAVED IN THE SERVICE PROVIDER LIST');
			console.log(iddd);
			var update={ $pull: { listOfCourses: iddd } };
 
			var opts= { safe: true, upsert: true };
			//update the serive provider
 
			ServiceProvider.update(condition,update,opts,(err,response)=>{
				if(err)
					throw err;
				else{
					console.log('FINALLY REMOVED FROM THE SERVICE PROVIDER LIST');
					console.log(response);
 
				}
  
			  });
 
 
		    });
 
		   }
 
	     });
 
 
 
       },
//the service provider can post announcment bt passing his course title 
		postAnnouncements:function(Coursetitle,newAnnouncement){
//the course is found in the database 
		Course.findOne({title:Coursetitle},(err,courseFound)=>{
		if(err){
		    console.log('error in post announcement Function ');
		    throw err;
		}else{

		    console.log(courseFound);
		    //the announcmet is being added to the list of course
		    courseFound.announcements.push(newAnnouncement);
		    courseFound.save();
		    console.log('AFTER THE PUSH');
		    console.log(courseFound);

		}

	 });

	},
	//the service provider can remove announcmet by passing the course title to be removeed 
		removeAnnouncements:function(courseTitleToBeRemoved,announcmmentToBeRemoved ){
	
	   
//the course is being searched for in the database
		Course.findOne({title:courseTitleToBeRemoved},(err,courseFound)=>{
	   if(err){
	    console.log('error in remove announcement Function ');
	    throw err;
	   }else{
	    console.log(courseFound);
//the course titile to be updated 
	    var condition={title:courseFound.title};
		console.log('Course title to be REMOVED');
		console.log(condition);

//remove the announcmnet from list of announcmets in the couurse 
		var update={ $pullAll: { announcements : [announcmmentToBeRemoved]}};
		console.log(update);

		var opts= { safe: true, upsert: true };
//the course is being updated 
		Course.update(condition,update,opts,(err,response)=>{
			if(err)
				throw err;
			else{
				console.log('FINALLY REMOVED FROM THE COURSE LIST');
				console.log(response);
				
			}

		});

	  }

	 });

	},


//update the parameteres of the course however we have taken all the parameters as in the view part we will then check if the req.body is 
//empty or not 

    updateCourse : function(title,centerName,type,centerLocation,description,startDate,endDate,capacity,announcement,fees){

	


		var objForUpdate = {};

		objForUpdate.centerName = centerName;
		objForUpdate.type = type;
	    objForUpdate.centerLocation =centerLocation;
		if (! description=='') objForUpdate.description =description;
		if (startDate) objForUpdate.startDate = startDate;
		if (endDate) objForUpdate.endDate = endDate;
		if (capacity) objForUpdate.capacity = capacity;
		if (announcement) objForUpdate.announcement = announcement;
		if (fees) objForUpdate.fees = fees;

		//course ids being updated 

			Course.update({title:title},objForUpdate,{upsert:true},function(err,objForUpdate){
				if(err){
					console.log(err)
				}
				else{
					console.log(objForUpdate);
					console.log('success')
				}
			})

		},
		
		// the serice provider could view all other service provider oon the platform 
	  getAllVerifiedServiceProvider:function(){ 
 //finad all the service providers in the database 
      
       ServiceProvider.find({username:{$ne:''}},function(err,spUsers) { 
        if (err) {
          console.log(err);
        } else 
         console.log("filtered_ServiceProviders")
         console.log(spUsers);
    });

   },
// ViewReviews function makes the service provider able to view the reviews written about a specific course that he's providing
  ViewReviews: function(courseID,SPorganizationName){
    var found=0;
	ServiceProvider.findOne({organizationName:SPorganizationName}).lean().exec(function(err,SP){

	if(err) console.log(err);
	  else {

	for(var i=0 ; i< SP.listOfCourses.length ; i++){

		if(SP.listOfCourses[i] == courseID){
            found=1;
 	    Course.findById(courseID,function(err,course){

  		for(var j = 0 ; j< course.ReviewsIDs.length ;j++){ //just return the list of reviews

    	Review.findById(course.ReviewsIDs[j],function(err,review){
        if(review==null)
        console.log("No reviews !") ;
      		else console.log(review );
   	      });
        }
       });
     }
    }
		if(!found)
		console.log("This course doesn't exist");
   }
  });

 },

//definePolicy function makes the service provider able to update the refund policy of his organization
 definePolicy: function(SPname,policy){
    ServiceProvider.findOne({organizationName: SPname},function(err,serviceprovider){
     if(err) throw err;

   serviceprovider.polices=policy;
   serviceprovider.save(function(err,serviceprovider){
     if(err) throw err;
     console.log("Done");
   });
   console.log(serviceprovider);
 });
},

//the service provider could view all the enroller students in the course by passing the course titile 

viewAllEnrolledStudents : function(courseTitlecourseTitle){
//the course is found by matching the course title by the passed argumnet
Course.findOne({title:courseTitle},(err,courseFound)=>{
	if(err)
		throw err;
	else{
	var lengthOfEnrolledStudents=courseFound.enrolledStudentsIDs.length;
	//lopp on the list of enrolled students and get their documnet from the collection to be viewd 
	for(var i=0;i<lengthOfEnrolledStudents;i++){
		var studentID=courseFound.enrolledStudentsIDs[i];
		Student.findById(studentID,(err,studentFound)=>{
			if(err)
				throw err;
			else
				console.log(studentFound);

		});
	}
}
});
},
//the servicde provider could register to the system by passing the field 
  spRegister: function(organizationName,mobileNumber,field,description,mobileNumber,email,address,polices,logo)
    {

//checks first tht this Service provider was not perviously registered to the system
	   ServiceProvider.findOne({organizationName:organizationName},function(err,organizationName)
	   {
	     if(err){ return next(err);}
	     if(organizationName)
	     {
	       console.log('Organization name already exists');
	       return ;
	     }

	   });

	    ServiceProvider.findOne({mobileNumber:mobileNumber},function(err,mobileNumber)
	   {
	     if(err){ return next(err);}
	     if(mobileNumber)
	     {
	       console.log('Mobile number already exists');
	       return;
	     }

	   });

	      ServiceProvider.findOne({email:email},function(err,email)
	   {
	     if(err){ return next(err);}
	     if(email)
	     {
	       console.log('email already exists');
	       return;
	     }

	   });
	      //creates a service provider to be added
	  var newOrganization = new ServiceProvider({         
	        organizationName:organizationName ,
	        field :field ,
	        description :description,
	        mobileNumber :mobileNumber,
	        email : email ,
	        address: address,
	        polices :polices,
	        logo :logo
	     
	    });                              
	    newOrganization.save((err,spSaved)=>{
	    	if(err)
	    		throw err;
	    	else
	    		console.log(spSaved);

	    });

},

//the service provider could login

	  SPLogin:function(username, password) { 
	  	//the service provider is found in the schema 
      ServiceProvider.findOne( {username :username },function(err, sp) {
        if (err) {
          console.log(err);
        }

        if(!sp)
             console.log("user not found");
     
   //match the password 
	      sp.checkPassword (password, function(err,isMatch){
	  
	        if(isMatch && isMatch==true){
	           return  console.log("you are logged in");
	          }else
	           return  console.log("wrong password");
	       });
          
       
          
   });

  }
		


}

module.exports = ServiceProviderController;