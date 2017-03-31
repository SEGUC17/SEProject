var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/platform");

var db = mongoose.connection;

 

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback) {

    console.log("Connection succeeded.");

   });

var Schema = mongoose.Schema;





var Reviews = new Schema({



  userName:{type: mongoose.Schema.Types.ObjectId, ref: 'Student'},

  review:{type:String},

  isNeg:Boolean,

  courses:[{type:mongoose.Schema.Types.ObjectId, ref: 'Course'}]



})



Reviews.methods.add = function(){

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

var review  = mongoose.model("Reviews", Reviews);



module.exports = review;