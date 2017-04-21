var Course =require('../db/Courses');
var ServiceProvider = require('../db/ServiceProvider');
var Student = require('../db/Student');
var Admin = require('../db/Admin');
var Review = require('../db/Reviews');
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
array = [];
<<<<<<< HEAD
=======

>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0


let ServiceProviderController = {

<<<<<<< HEAD
=======
//done
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
    clearUNverSP: function(req,res,cb){ // this method removes all
    
       ServiceProvider.remove(function(err){
       	if(err){
       		console.log("CAN'T REMOVE");
       		cb(err,"CANT REMOVE SERVICE PROVIDERS","ERROR");
       	}
       	else{
       		console.log("DONE");
       		cb(err,"REMOVED ALL SERVICE PROVIDERS","SUCCESS")
       	}

       });
 
    },
<<<<<<< HEAD

=======
        getCourse: function(req,res,cb){
        	Course.findOne({title:req.body.title},(err,result)=>{
        		if(err){
        			cb(err,"NO COURSE FOUND","ERROR")
        		}else{
        			cb(err,result,"SUCCESS");
        		}
        	})
        },
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
    viewCourses : function(req,res,cb){
		var ServiceProviderID = req.decoded.id; 
    	ServiceProvider.findById(ServiceProviderID, function(err,docs){
    		if(docs){
    			for(var i = 0; i < docs.listOfCourses.length; i++){
    				Course.findById(docs.listOfCourses[i],function(err,doc){
    					array.push(doc);
    				});
    			}

    		}else
    			cb(err,"Service Provider not found !", "ERROR");

    		if(array.length == 0)
	    		cb(err,"No courses are found !", "ERROR");
	    	else 
	    		cb(err, array,"SUCCESS");

	    	while(array.length > 0){
	    		array.pop();
	    	}

    	});



    },

          getCourse: function(req,res,cb){
        	Course.findOne({title:req.body.title},(err,result)=>{
        		if(err){
        			cb(err,"NO COURSE FOUND","ERROR")
        		}else{
        			cb(err,result,"SUCCESS");
        		}
        	})
        },


// Service Provider can create or update his protofiolo

	updatePortofolio : function (req,res,cb) {

		var ServiceProviderID = req.decoded.id; 


		var toBeUpdated = {};
		if (req.body.password) toBeUpdated.password = req.body.password;
		if (req.body.mobileNumber) toBeUpdated.mobileNumber = req.body.mobileNumber;
		if (req.body.description) toBeUpdated.description = req.body.description;
		if (req.body.email) toBeUpdated.email = req.body.email;
		if (req.body.address) toBeUpdated.address = req.body.address;
		if (req.body.polices) toBeUpdated.polices = req.body.polices;
		if (req.body.logo) toBeUpdated.logo = req.body.logo;
		if (req.body.field) toBeUpdated.field = req.body.field;

		ServiceProvider.findById(ServiceProviderID, function(err,docs) {

			if(docs){
				ServiceProvider.update({_id : ServiceProviderID}, toBeUpdated, function(err,res){
					if(err)
						cb(err,"ERROR updating service provider !","ERROR");
					else{

						ServiceProvider.findById(ServiceProviderID,function(err,dox){
							if(dox)
								cb(err,dox,"SUCCESS");
						});

					}
<<<<<<< HEAD
				});

			}else
=======

				});

			}else

>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
				cb(err,"Service Provider not found !", "ERROR");
		});
	},

	//the service provider can add a course and passing his Id 
    addCourse:function(req,res,cb){
     
    	//uncomment before submission//uncomment ends here
     
    	//for testing replaace the id with object id from the database
    	var serciveProviderIDSession=req.decoded.id;
    	//testing ends
    	console.log(serciveProviderIDSession);
     
    		//for submitting uncomment
    		var newCourse=new Course({
    				title:req.body.title,
    				centerName:req.body.centerName,
    				centerLocation:req.body.centerLocation,
    				type:req.body.type,
    				description:req.body.description,
    				startDate:req.body.startDate,
    				endDate:req.body.endDate,
    				capacity:req.body.capacity,
    				announcement:req.body.announcement,
    				fees:req.body.fees,
    				enrolledStudents:req.body.enrolledStudents,
    				serviceProviderID:serciveProviderIDSession
     
    			});
    		//uncomment ends here
     
    		
     
    	newCourse.save((err,savedCourse)=>{
    		if(err){
    			
    			console.log('Cant save the Course');
    			cb(err,"THIS COURSE HAS BEEN ADDED BEFORE SAVE","ERROR");
    		}else{
    		   		ServiceProvider.findById(serciveProviderIDSession,(err,ServiceProviderResult)=>{
    		   		if(err){
    		   			cb(err,"THIS COURSE HAS BEEN ADDED BEFORE FIND","ERROR");
    		   			console.log('error in the addCourse Function :(');
    		   		}else{
    		   		console.log('Service Provider Found :)');
    		   		console.log(ServiceProviderResult);
    		   		var cousreid=savedCourse._id;
    		   		var lengthofCourse=ServiceProviderResult.listOfCourses.length;
    		   		console.log('Length');
    		   		console.log(lengthofCourse);
    		   		var found=0;
     
    		   		for(var i=0;i<lengthofCourse;i++){
    		   			if(ServiceProviderResult.listOfCourses[i]==cousreid)
    		   			{
    		   				console.log('this course has been added before SORRY');
    		   				found=1;
    		   				break;
    		   			}
    		   		}
    		   		if(found==0){
    		   		ServiceProviderResult.listOfCourses.push(cousreid);
    		   		ServiceProviderResult.save((err,newCOurseSaved)=>{
    		   			if(err)
    		   				cb(err,"THIS COURSE HAS BEEN ADDED BEFORE SERVICE PROVIDER ","ERROR");
    		   			else {
    		   				console.log('After the push FINALLY');
    		   				lengthofCourse=ServiceProviderResult.listOfCourses.length;
    		   				console.log(ServiceProviderResult);
    		   				cb(err,savedCourse,"SUCCESS");
    	
    		   			}
					});
    		   		}
    				}
    		   	});
    		   }
    	});
     
    },
    //done
//service provider removes a course by passong in the parameter and his id
		removeCourse: function(req,res,cb){
 
			var courseTitleToBeRemoved=req.body.title;
			var serciveProviderIDSession=req.decoded.id;
			ServiceProvider.findById(serciveProviderIDSession,(err,serviceProviderFound)=>{
 				if(err){
 				console.log('service provider cant be found ');
				 cb(err,"SERVICE PROVIDER CANT BE FOUND","ERROR");
				 return ;
 						}else{
 							var serviceProviderListCoursesLength=serviceProviderFound.listOfCourses.length;
							console.log(serviceProviderListCoursesLength);
			Course.findOne({title:courseTitleToBeRemoved},(err,resultCourse)=>{
				if(err){
				console.log('service provider cant be found ');
				cb(err,"COURSE CAN'T BE FOUND","ERROR");
				return ;
				}else{
				console.log(resultCourse);
				var xx = resultCourse.enrolledStudentsIDs.length;
				for(var i=0;i<xx;i++){
					var StudentIDtoBeFound=resultCourse.enrolledStudentsIDs[i];
					Student.findById(StudentIDtoBeFound,(err,studentFound)=>{
						var condition={username:studentFound.username};
						var iddd=resultCourse._id;
						var update={ $pull: { ListOfCourses: iddd } };
						var opts= { safe: true, upsert: true };
						Student.update(condition,update,opts,(err,response)=>{
							if(err)
							{
								console.log("CANT REMOVE THE COURSE FROM THE STUDENT LIST OF COURSES");
								cb(err,"CANT REMOVE THE COURSE FROM THE STUDENT LIST OF COURSES","ERROR");
								return ;
							}
						});
					});
				}
					resultCourse.remove((err)=>{
							if(err){
							cb(err,"CANT REMOVE COURSE ","ERROR");
							return ;
								}else{
									var condition={username:serviceProviderFound.username};
									var iddd=resultCourse._id;
									console.log('COURSE ID SAVED IN THE SERVICE PROVIDER LIST');
									console.log(iddd);
									var update={ $pull: { listOfCourses: iddd } };
									var opts= { safe: true, upsert: true };
								ServiceProvider.update(condition,update,opts,(err,response)=>{
									if(err){
									cb(err,"CANT REMOVE THE COURSE FROM SERVICE PROVIDER LIST OF COURSES","ERROR");
									return ;
											}else{
												console.log('FINALLY REMOVED FROM THE SERVICE PROVIDER LIST');
												return cb(err,resultCourse,"SUCCESS");
											}

								});
	
									
								}
	
					});

			}

			});
 						}
		   });

       },
//the service provider can post announcment bt passing his course title 
		postAnnouncements:function(req,res,cb){
<<<<<<< HEAD
		 var newAnnouncement=req.body.announcement;
=======
		 var newAnnouncement=req.body.announcements;
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
		 var Coursetitle=req.body.title;
		Course.findOne({title:Coursetitle},(err,courseFound)=>{
		if(err){
		    cb(err,"CANT FIND THE REQUESTED COURSE","ERROR");
		    return;
		}else{
		    console.log(courseFound);
		    courseFound.announcements.push(newAnnouncement);
		    courseFound.save((err,result)=>{
		    	if(err){
		    		cb(err,"SORRY CANT SAVE THE NEW ANNOUNCMET TO THE COURSE");
		    	}else{
		    		cb(err,result,"SUCCESS");
		    	}
		    });
		}

	 });

	},
	//the service provider can remove announcmet by passing the course title to be removeed 

		removeAnnouncements:function(req,res,cb){
	
		var courseTitleToBeRemoved=req.body.courseTitle;
		
		var announcmmentToBeRemoved=req.body.announcement;

		Course.findOne({title:courseTitleToBeRemoved},(err,courseFound)=>{
	   if(err){
	    cb(err,"CANT FIND THE COURSE","ERROR")
	   }else{
	   
	    var condition={title:courseFound.title};
		console.log('Course title to be REMOVED');	
		var update={ $pullAll: { announcements : [announcmmentToBeRemoved]}};
		var opts= { safe: true, upsert: true };
		Course.update(condition,update,opts,(err,response)=>{
			if(err)
				{
					cb(err,"CANT POST THE ANNOUNCMET","ERROR");
				}
			else{
				Course.findOne({title:courseTitleToBeRemoved},(err,result)=>{
					if(err){
				cb(err,"NO COURSE FOUND","ERROR");
			}else{
				cb(err,result.announcements,"SUCCESS");
<<<<<<< HEAD
=======
			}
				});
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
			}
				});

<<<<<<< HEAD
			}
				});
			}
=======

		});

	  }
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0

	 });

	},


	viewAnnouncemnets:function(req,res,cb){
		var Coursetitle=req.body.title;
		Course.findOne({title:Coursetitle},(err,result)=>{
			if(err){
				cb(err,"COURSE NOT FOUND","ERROR");
			}else{
				cb(err,result.announcements,"SUCCESS");
			}
		});

	},

//update the parameteres of the course however we have taken all the parameters as in the view part we will then check if the req.body is 
//empty or not 


   updateCourse : function(req,res,cb){

		var title=req.body.title;
		var objForUpdate = {};

		if(req.body.centerName) objForUpdate.centerName = req.body.centerName;
		if(req.body.type) objForUpdate.type = req.body.type;
	    if(req.body.centerLocation) objForUpdate.centerLocation =req.body.centerLocation;
		if (req.body.description) objForUpdate.description = req.body.description;
		if (req.body.startDate) objForUpdate.startDate = req.body.startDate;
		if (req.body.endDate) objForUpdate.endDate = req.body.endDate;
		if (req.body.capacity) objForUpdate.capacity = req.body.capacity;
		if (req.body.announcement) objForUpdate.announcement = announcement;
		if (req.body.fees) objForUpdate.fees = req.body.fees;
 
		Course.update({title:title},objForUpdate,{upsert:true},function(err,objForUpdate){
 
			if(err)
					cb(err,"CAN NOT UPDATE COURSE","ERROR");
			
			else{
           			Course.findOne({title:title},(err,result)=>{
           				if(err){
             				cb(err,"CAN NOT FIND COURSE","ERROR");
             			}else{
             				cb(err,result,"SUCCESS");
             			}
             		});
			}
		});
 
	},

	updatePolicy: function(req,res){
		if(req.decoded.type == "ServiceProvider"){
			ServiceProvider.findById(req.decoded.id,function(err,serviceprovider){
				if(serviceprovider){
			 		serviceprovider.polices = req.body.policy;
			 		serviceprovider.save(function(err,serviceprovider){
			   			if(err) 
			 				res.send(err,'ERROR',"ERROR");
			 			else
			 				res.send(err,'Your policy has been updated successfully',"SUCCESS");

			 		});
			 	}else 
			 		res.send(err,'Service Provider not found',"ERROR");

			});
		}

	},
//lsa
//the service provider could view all the enroller students in the course by passing the course titile 
	viewAllEnrolledStudents : function(req,res,cb){
		
    	//array.clear();

    	//array.splice(0, array.length);
		
		var x = 0;

		if(req.decoded.type == "ServiceProvider"){
			var courseTitle=req.body.title;
			Course.findOne({title:courseTitle},(err,courseFound)=>{
				if(courseFound){

					var lengthOfEnrolledStudents=courseFound.enrolledStudentsIDs.length;

					for(var i = 0; i < lengthOfEnrolledStudents; i++){
						var studentID = courseFound.enrolledStudentsIDs[i];

						
						Student.findById(studentID,(err,studentFound)=>{

							console.log(studentFound);
							if(studentFound){
								array[x] = studentFound;
								x++;
							}
							else{
								cb(err,"Student not found", "ERROR");

							}

						});

					}
					
					
					// for(var y = array.length-1; y > x; y--)
					// 		array.pop();
										
					//console.log(array);
					if(array.length == 0)
						cb(err, "No students found", "SUCCESS");
					else 
						cb(err, array, "SUCCESS");

					while(array.length > 0)
							array.pop();

				}else
					cb(err, "Course not found", "ERROR");

			});
		}else
			cb("", "You are not a Service Provider","ERROR");
	},


//the servicde provider could register to the system by passing the field 
       spRegister: function(req,res,cb){
    //checks first tht this Service provider was not perviously registered to the system
    	   ServiceProvider.findOne({organizationName:req.body.organizationName},function(err,organizationName){
    	     	if(organizationName)
    	       		cb(err,"Organization name already exists","ERROR");
    	   		else {
    	   			ServiceProvider.findOne({mobileNumber:req.body.mobileNumber},function(err,mobileNumber){
    	     			if(mobileNumber)
    	       				cb(err,"Mobile number already exists","ERROR");
    	       			else{
     
    						ServiceProvider.findOne({email:req.body.email},function(err,email){
    							if(email)
    	       						cb(err,"email already exists","ERROR");
    	       					else {
     
    	       						var newOrganization = new ServiceProvider({         
    	        						organizationName:req.body.organizationName ,
    	        						field :req.body.field ,
    	        						description :req.body.description,
    							        mobileNumber :req.body.mobileNumber,
    							        email : req.body.email ,
    							        address: req.body.address,
    							        polices :req.body.polices,
    							        logo :req.body.logo
     
    	    						}); 
     
    	   							 newOrganization.save((err,spSaved)=>{


    	    							if(err)
    	     								cb(err,"YOU HAVE PREVIOUSLY REGISTERED","ERROR");
    	    							else
    	    								cb(err,"you are registered expect an email soon ;)","SUCCESS");
    	   							 });
     
    	       					}
    	       				});
    					}
     
    	   			});
     
    	   		}
     
    	 	});
    	},


//the service provider could login
	SPLogin:function(req, res, cb) { 
	  	//the service provider is found in the schema
      	ServiceProvider.findOne( {username :req.body.username },function(err1, sp) {
        if (err1) {
       		cb(err1,"Service Provider not found","ERROR");
        }else{
 
      		if(sp){

	     		sp.checkPassword (req.body.password, function(err2,isMatch){
	     
	        		if(isMatch && isMatch == true)
	           			cb(err2,sp,"SUCCESS") ;
	          		else 
	          	 		cb( err2,"WRONG PASSWORD","ERROR") ;
	         		
	       		});

			}else
				cb(err1,"Service Provider not found","ERROR");
 
   		}
 
  	});

 	},

 	viewPortofolio:function(req,res,cb){
 		var serciveProviderIDSession=req.decoded.id;
 		ServiceProvider.findById(serciveProviderIDSession,(err,result)=>{
 			if(err){
 				cb(err,"NO SERVICE PROVIDER FOUND","ERROR");
 			}else{
 				cb(err,result,"SUCCESS");
 			}

 		});

 	},


//getting the list of reviews of a specific course which is provided by this service provider
	ViewReviews: function(req,res,cb){

		ServiceProvider.findOne({_id : req.decoded.id}).lean().exec(function(err,SP){

			if(SP){
	  			Course.findOne({title : req.body.title},function(err,course){
	  				if(course){
	   	 				for(var j = 0; j < course.ReviewsIDs.length; j++){ 
	      					Review.findById(course.ReviewsIDs[j],function(err,review){
	      						if(review)
	      							array.push(review);
	        				});
	  					}		

					}else
						cb(err,"Course is not found !", "ERROR");
	   				
	 				});
			}else
				cb(err,"Service provider is not found !", "ERROR");

			if(array.length == 0)
				cb(err,"No reviews found !", "SUCCESS");
			else 
				cb(err,array,"SUCCESS");

			while(array.length > 0)
				array.pop();

	 	});
	},

	getNotifications: function(req,res,cb){ 
        ServiceProvider.findById(req.decoded.id,function(err,sp){
          if (sp){
            var array = sp.listOfNotification;
            if(array.length == 0)
              cb(err,"No notifications found !", "ERROR");
            else 
              cb(err,array,"SUCCESS");
          }else
              cb(err,"Service provider is not found !", "ERROR");
        });
    }

}

module.exports = ServiceProviderController;
