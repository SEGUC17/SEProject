    var mongoose=require('mongoose');
    //var bcrypt   = require('bcrypt-nodejs');
    var Course=require('./Courses');
     
     
    var ServiceProviderSchema=mongoose.Schema({
     
    	username:{
    		type:String
    		// required:true
    	},
    	expirationDate:{
    		type:Date
    	},
    	passowrd:{
    		type:String
    	},
    	organizationName:{
    		type:String,
    		unique:true
    		// required:true
    	},
    	field :{
    		type:String,
    		required:true
    	},
    	description :{
    		type:String,
    		required:true
    	},
    	mobileNumber :{
    		type:Number,
    		required:true,
    		unique:true
    	},
    	email :{
    		type:String,
    		required:true,
    		unique:true
    	},
    	address :{
    		type:String,
    		required:true
    	},
    	polices:{
    		type:String,
    		required:true
    	},
    	logo :{
    		type:String,
     
    	},
    	listOfCourses:
     
    		[{type:String}] //this string is an ID of a course, and you can get the course using .findbyID()
     
     
    });
     
    var ServiceProvider= module.exports=mongoose.model('ServiceProvider',ServiceProviderSchema)
