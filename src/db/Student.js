var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/platform");

var db = mongoose.connection;

 

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback) {

    console.log("Connection succeeded.");

   });


var Schema = mongoose.Schema;

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
		required:true
	},
	name: {
		type: String
	},
	birthdate:{
  type:Date},

	ListOfCourses:
		[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
	,

	profilePicture:{
		type: String
	}

});

studentSchema.methods.add = function(){

	console.log("enteredd");

	//var rev = new review({"review": "Hell", "isNeg":true, courses:["58de7687f72024611ebaad7f"]});

	this.save(function(err){

		console.log("saved");

		if(err){



			console.log(err);

		}

	})

	console.log("done");

}

var student = module.exports = mongoose.model('Student', studentSchema);