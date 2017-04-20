var Course =require('../db/Courses');
var ServiceProvider = require('../db/ServiceProvider');
var Student = require('../db/Student');
var Admin = require('../db/Admin');
var Review = require('../db/Reviews');
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
array = [];



<<<<<<< HEAD
clearUNverSP: function(){
=======
let ServiceProviderController = {

//done
    clearUNverSP: function(req,res,cb){ // this method removes all
    
>>>>>>> frontend_backend_combined
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
// Service Provider can create or update his protofiolo
<<<<<<< HEAD
createAndUpdatePortofolio : function (req,res) {
		var ServiceProviderID = req.session._id;

		var toBeUpdated = {
			password : req.body.password,
		    field : req.body.field,
			description : req.body.description,
			mobileNumber : req.body.mobileNumber,
			email :req.body.email,
			address : req.body.address,
			polices : req.body.polices,
			logo : req.body.logo
		};
=======

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
>>>>>>> frontend_backend_combined

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

<<<<<<< HEAD
			}

		});
=======
					}
>>>>>>> frontend_backend_combined

				});

			}else

				cb(err,"Service Provider not found !", "ERROR");
		});
	},
	//the service provider can add a course and passing his Id
addCourse:function(req,res){

<<<<<<< HEAD
=======
	//the service provider can add a course and passing his Id 
    addCourse:function(req,res,cb){
     
>>>>>>> frontend_backend_combined
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
<<<<<<< HEAD

    		var headerToBeSet=false;

=======
     
    		
     
>>>>>>> frontend_backend_combined
    	newCourse.save((err,savedCourse)=>{
    		if(err){
    			
    			console.log('Cant save the Course');
<<<<<<< HEAD

    			return res.json({
    				success:false,
    				message:"No Save"
    			})
=======
    			cb(err,"THIS COURSE HAS BEEN ADDED BEFORE SAVE","ERROR");
>>>>>>> frontend_backend_combined
    		}else{
    		   		ServiceProvider.findById(serciveProviderIDSession,(err,ServiceProviderResult)=>{
    		   		if(err){
    		   			cb(err,"THIS COURSE HAS BEEN ADDED BEFORE FIND","ERROR");
    		   			console.log('error in the addCourse Function :(');
<<<<<<< HEAD

=======
>>>>>>> frontend_backend_combined
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
<<<<<<< HEAD
    		  });

    		},
//service provider removes a course by passong in the parameter and his id
removeCourse: function(req,res){

			//uncomment before submission
			//var courseTitleToBeRemoved=req.Course.title;
			//uncomment ends here

			//FOR TESTING replace the name of the course that u have just added
			// var courseTitleToBeRemoved='remove';
			//TESTING ENDS HERE


			//uncomment before submission
			//var serciveProviderIDSession=req.user.serviceProviderName;
			//uncomment ends here

			//FOR TESTING REPLACE WITH THE ObjectId from the databas
			var serciveProviderIDSession= req.session._id;
			//TESTING ENDS HERE

=======
    	});
     
    },
    //done
//service provider removes a course by passong in the parameter and his id
		removeCourse: function(req,res,cb){
 
			var courseTitleToBeRemoved=req.body.title;
			var serciveProviderIDSession=req.decoded.id;
>>>>>>> frontend_backend_combined
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
<<<<<<< HEAD
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

=======
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
>>>>>>> frontend_backend_combined
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
<<<<<<< HEAD
			var condition={username:serviceProviderFound.username};
			console.log('SERVICE PROVIDER USERNAME :');
			console.log(condition);
			var iddd=resultCourse._id;
			console.log('COURSE ID SAVED IN THE SERVICE PROVIDER LIST');
			console.log(iddd);
			var update={ $pull: { listOfCourses: iddd } };

			var opts= { safe: true, upsert: true };

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
postAnnouncements:function(req,res){
		//FOR SUBMISSION UNCOMMENT HERE
		 var newAnnouncement=req.body.newAnnouncement;
		 var Coursetitle=req.body.Coursetitle;
		//UNCOMMENT ENDS HERE

		//FOR TESTING
		//var newAnnouncement='STRING ANNOUN';
		//var Coursetitle='added2';
		//ENDS TESTING

=======
 						}
		   });

       },
//the service provider can post announcment bt passing his course title 
		postAnnouncements:function(req,res,cb){
		 var newAnnouncement=req.body.announcement;
		 var Coursetitle=req.body.title;
>>>>>>> frontend_backend_combined
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
<<<<<<< HEAD
	//the service provider can remove announcmet by passing the course title to be removeed
removeAnnouncements:function(req,res){
		//FOR SUBMISSION UNCOMMENT HERE
		var courseTitleToBeRemoved=req.body.courseTitle;
		//UNCOMMENT ENDS HERE

	    // TESTING
		//var courseTitleToBeRemoved='added2';
=======
	//the service provider can remove announcmet by passing the course title to be removeed 

		removeAnnouncements:function(req,res,cb){
	
		var courseTitleToBeRemoved=req.body.courseTitle;
		
>>>>>>> frontend_backend_combined
		var announcmmentToBeRemoved=req.body.announcement;

		Course.findOne({title:courseTitleToBeRemoved},(err,courseFound)=>{
	   if(err){
	    cb(err,"CANT FIND THE COURSE","ERROR")
	   }else{
	   
	    var condition={title:courseFound.title};
<<<<<<< HEAD
		console.log('Course title to be REMOVED');
		console.log(condition);

=======
		console.log('Course title to be REMOVED');	
>>>>>>> frontend_backend_combined
		var update={ $pullAll: { announcements : [announcmmentToBeRemoved]}};
		var opts= { safe: true, upsert: true };
		Course.update(condition,update,opts,(err,response)=>{
			if(err)
				{
					cb(err,"CANT POST THE ANNOUNCMET","ERROR");
				}
			else{
<<<<<<< HEAD
				console.log('FINALLY REMOVED FROM THE COURSE LIST');
				console.log(response);

=======
				Course.findOne({title:courseTitleToBeRemoved},(err,result)=>{
					if(err){
				cb(err,"NO COURSE FOUND","ERROR");
			}else{
				cb(err,result.announcements,"SUCCESS");
>>>>>>> frontend_backend_combined
			}
				});
			}


		});

	  }

	 });

	},
<<<<<<< HEAD
//update the parameteres of the course however we have taken all the parameters as in the view part we will then check if the req.body is
//empty or not
updateCourse : function(req,res){
=======


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
>>>>>>> frontend_backend_combined

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
 
				if(err){
					cb(err,"CAN NOT UPDATE COURSE","ERROR");
				}
				else{
             			Course.findOne({title:title},(err,result)=>{
             				if(err){
             					cb(err,"CAN NOT FIND COURSE","ERROR");
             				}else{
             					cb(err,result,"SUCCESS");
             				}
             			});
				}
			})
 
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

<<<<<<< HEAD
	  getAllVerifiedServiceProvider:function(req,res , cb){ // leh bta5od username we password ?
       //  let ServiceProvider = new sp(username);

       ServiceProvider.find({username:{$ne:''}},function(err,spUsers) { // change undefined to empty string
        if (err) {
          return res.json({success: false,
          	       message: "error"});
        } else
        cb(err,spUsers);
         return ; //res.json(spUsers);
    });

   },
// ViewReviews function makes the service provider able to view the reviews written about a specific course that he's providing
ViewReviews: function(req,res){
   ServiceProvider.findOne({organizationName:req.body.organizationName}).lean().exec(function(err,SP){

    if(err) throw err;
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
//definePolicy function makes the service provider able to update the refund policy of his organization
updatePolicy: function(req,res){
    ServiceProvider.findOne({organizationName:req.body.organizationName},function(err,serviceprovider){
     if(err) throw err;

   serviceprovider.polices=req.body.policy;
   req.flash('success_msg','Your policy has been updated successfully');
   serviceprovider.save(function(err,serviceprovider){
     if(err) throw err;
   });

  });
},
//the service provider could view all the enroller students in the course by passing the course titile
viewAllEnrolledStudents : function(req,res){

  var courseTitle=req.body.title;
    Course.findOne({title:courseTitle},(err,courseFound)=>{
    	if(err)
    		throw err;
    	else{
    	var lengthOfEnrolledStudents=courseFound.enrolledStudentsIDs.length;
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
spRegister: function(req,res){
    	console.log("HENA");
    var headerToBeSet=false;
    //checks first tht this Service provider was not perviously registered to the system
	   ServiceProvider.findOne({organizationName:req.body.organizationName},function(err,organizationName)
	   {
	   	console.log("organizationName");

	     if(err){
		headerToBeSet=true;
	     	return
	     	res.json({
	     	success:false,
	     	message:"ERROR organizationName"
	     })

	     }

	     if(organizationName)
	     {
	       console.log('Organization name already exists');
	       if(!headerToBeSet){
	       	headerToBeSet=true;
	       return res.json({
	       	success:false,
	       	message:"Organization name already exists"
	       });
	     }
	    }

	   });

	    ServiceProvider.findOne({mobileNumber:req.body.mobileNumber},function(err,mobileNumber)
	   {

	      if(err && !headerToBeSet){
	      	headerToBeSet=true;
	     	return
	     	res.json({
	     	success:false,
	     	message:"ERROR mobileNumber"
	     })

	     }
	     if(mobileNumber && !headerToBeSet)
	     {
	     	headerToBeSet=true;
	       console.log('Mobile number already exists');
	         return res.json({
	       	success:false,
	       	message:"Mobile number already exists"
	       });
	     }

	   });

	    ServiceProvider.findOne({email:req.body.email},function(err,email){
	      if(err && !headerToBeSet){
	      	headerToBeSet=true;
	      return res.json({
	     	success:false,
	     	message:"ERROR EMAIL"
	     })
	     	}
	     if(email && !headerToBeSet)
	     {
	     	headerToBeSet=true;
	       console.log('email already exists');

	       return res.json({
	       	success:false,
	       	message:"email already exists"
	       });
	     }

	   });
	      //creates a service provider to be added
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
	    	if(err && !headerToBeSet){
	      	headerToBeSet=true;
	    		return res.json({

	     	success:false,
	     	message:"ERROR SAVE"
	     })
	    	throw err;
	    }
	    	else{
	    		console.log(spSaved);
	    		if(!headerToBeSet)
	    		return res.json({
	    			success:true,
	    			message:"you are registered expect an email soon ;)"
	    		});
	    	}

	    });
=======
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
										
					console.log(array);
					if(array.length == 0)
						cb(err, "No students found", "ERROR");
					else 
						cb(err, array, "SUCCESS");

					for(var y = array.length-1; y > 0; y--)
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

>>>>>>> frontend_backend_combined

},
//the service provider could login
<<<<<<< HEAD
 SPLogin:function(req, res, cb) {
	  	//the service provider is found in the schema
	  	var headerToBeSet=false;
      ServiceProvider.findOne( {username :req.body.username },function(err1, sp) {
        if (err1) {
          return res.json({
          	 success:false,
          	 message:'error'
          })
        }

        if(!sp && !headerToBeSet){
        	headerToBeSet=true;
       return res.json({
		success:false,
		message:'user not found'

			})

        }


   //match the password
	   sp.checkPassword (req.body.password, function(err2,isMatch){
	     cb(sp, err2)
	        if(isMatch && isMatch==true){
	           console.log("you are logged in");
	          if(!headerToBeSet){
	          	headerToBeSet=true;
	          	return
	           res.json({
					success:true,
					message:'user found',
					sp:sp

						})
	       }


	          }else{
	          	if(!headerToBeSet)
	           return
	             res.json({
					success:false,
					message:'password incorrect'

						})
	         }

	       });


   });

  }
=======
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
>>>>>>> frontend_backend_combined

 	}
}

module.exports = ServiceProviderController;
