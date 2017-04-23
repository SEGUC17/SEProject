
var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Course=require('./Courses');

var Admin = require('./Admin');
var moment = require('moment');
var SALT_FACTOR = 10;

var ServiceProviderSchema=mongoose.Schema({

	username:{
		type:String,
		default:""
		// required:true
	},
	expirationDate:{
		type:Date
	},
	password:{
		type:String
			},
	organizationName:{
		type:String,
		unique:true
		//required:true
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
		type:String,
		required:true,
		unique:true
	},
	email :{
		type: String, 
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

		[{type:String}], 
		// carries the IDs of the courses which are provided with this service provider

	listOfNotification: [{typeOfNotification:String}]

});



ServiceProviderSchema.pre("save", function(done) { // cryption for password
  var ServiceProvider = this;
  if (!ServiceProvider.isModified("password")) {
  	console.log("not changed");

    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(ServiceProvider.password, 
salt, null, function(err, hashedPassword) {
      if (err) { return done(err); }
      ServiceProvider.password = hashedPassword;
      done();
    });
  });
});
ServiceProviderSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};









// to run the notification system
//ServiceProvider.loop();
  
var InsertServiceProvider=function(sp){
	sp.save((err)=>{
		if(err)
			throw err
		else
			console.log("ADDED");

	})
}



var ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);