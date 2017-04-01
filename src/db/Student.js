var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-type-email');

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
		type: mongoose.SchemaTypes.Email, 
		required: true
	},
	name: {
		type: String
	},
	birthdate:{
     type:Date},

	ListOfCourses:  // holds the course IDs that the student is taking
		[{type:String}]
	,

	profilePicture:{
		type: String
	}

});


var student = module.exports = mongoose.model('Student', studentSchema);
