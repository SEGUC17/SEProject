
var mongoose=require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
var Course=require('./Courses');

require('mongoose-type-email');

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
		type: mongoose.SchemaTypes.Email, 
		required: true, 
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

		[{type:String}] // carries the IDs of the courses which are provided with this service provider
	

});
 
var ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);


    

