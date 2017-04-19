var Course =require('../db/Courses');
var ServiceProvider = require('../db/ServiceProvider');
var Student = require('../db/Student');
var Admin = require('../db/Admin');
var Review = require('../db/Reviews');
var jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');


let ServiceProviderController = {

//done
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



//will be done by mariam 
// Service Provider can create or update his protofiolo

	createAndUpdatePortofolio : function (req,res,cb) {
		if(req.decoded.type=="ServiceProvider"){
		var ServiceProviderID = req.decoded.id; 

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

		ServiceProvider.findById(ServiceProviderID, function(err,docs) {
			if(err){
				console.log("ERROR");
			cb(err,"CANT FIND SERVICE PROVIDER","ERROR");
			}else {
				ServiceProvider.update({_id : ServiceProviderID}, toBeUpdated, function(err,res){
					if(err){
							console.log("ERROR");
							cb(err,"CANT UPDATE SERVICE PROVIDER","ERROR");
					}else{
						console.log('updated');
						ServiceProvider.findById(serviceProviderID,(err,docs)=>{
							if(err){
								console.log("ERROR");
								cb(err,"CANT FIND SERVICE PROVIDER","ERROR");
							}else{
								console.log("SUCCESS");
							cb(err,docs,"SUCCESS");
							}
						})
					}

				})

			}
		
		});
	}else{
			cb("ERROR","YOU ARE NOT AN Service Provider SORRY","ERROR");
	}

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
		 var newAnnouncement=req.body.announcement;
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
			}
				});
			}


		});

	  }

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
		objForUpdate.centerName = req.body.centerName;
		objForUpdate.type = req.body.type;
	    objForUpdate.centerLocation =req.body.centerLocation;
		if (req.body.description) objForUpdate.description = req.body.description;
		if (req.body.startDate) objForUpdate.startDate = req.body.startDate;
		if (req.body.endDate) objForUpdate.endDate = req.body.endDate;
		if (req.body.capacity) objForUpdate.capacity = req.body.capacity;
		if (req.body.announcement) objForUpdate.announcement = announcement;
		if (req.body.fees) objForUpdate.fees = req.body.fees;

		console.log(objForUpdate);

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

		//done
	  getAllVerifiedServiceProvider:function(req,res , cb){ 
       ServiceProvider.find({username:{$ne:''}},function(err,spUsers) { 
        if (err) {
           cb(err,"NO SERVICE PROVIDERS","ERROR");
        } else {
        cb(err,spUsers,"SUCCESS");
    }
       
    });

   },



//done by mariam
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

//done by mariam
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


//DONE BAS HASSA FE HAGA GHALAAT 


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
	    								cb(err,"you are registered expect an email soon ;)","ERROR");
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

 	}
}

module.exports = ServiceProviderController;