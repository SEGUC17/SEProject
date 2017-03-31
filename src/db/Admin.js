var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/platform");

var db = mongoose.connection;

 

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback) {

    console.log("Connection succeeded.");

   });


var Schema = mongoose.Schema;
//To use DateOnly we should write npm i mongoose-type-email --save
require('mongoose-type-email');


var adminSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  picture:String,
  email:{type: mongoose.SchemaTypes.Email, required: true},
  Birthdate: {type: Date}

});

adminSchema.methods.add = function(){

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

//adminSchema.methods.verifySP = 

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin ;