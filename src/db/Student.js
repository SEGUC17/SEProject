var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Courses = require('./Courses');
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;


var studentSchema = new Schema({
	username: {
		type: String,
		required:true,
		unique:true
	},
	password: {
		type: String,
		required:true
	},
	email: {
		type: String, 
		required: true
	},
	name: {
		type: String
	},
	birthdate:{
       type:Date
   },

	ListOfCourses:  // holds the course IDs that the student is taking
		[{type:String}]
	,

	profilePicture:{
		type: String
	}

});


studentSchema.pre("save", function(done) {
  var student = this;
  if (!student.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(student.password, salt, null, function(err, hashedPassword) {
      if (err) { return done(err); }
      student.password = hashedPassword;
      done();
    });
  });
});

studentSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
  	if(err)
  		console.log(err)
  	else{
  		console.log(isMatch);
         done(err, isMatch);
  	}
  });
};


var student = module.exports = mongoose.model('Student', studentSchema);