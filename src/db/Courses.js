var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/platform");

var db = mongoose.connection;

 

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function(callback) {

    console.log("Connection succeeded.");

   });


var Schema = mongoose.Schema;

var Courses = new Schema({

    title: { type: String, required: true,unique: true },
    centerName: {type:String,required:true},
    centerLocation: {type:String,required:true},
    type: {type:String,required:true},
    description: {type:String,required:true},
    startDate: {type:Date,required:true},
    endDate: {type:Date,required:true},
    capacity:{type:Number ,required:true },
    announcement:{type:String},
    fees:{type:String ,required:true},
    enrolledStudents:[{type:mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    serviceProviderName:{type:mongoose.Schema.Types.ObjectId, ref: 'ServerProvider'},
    listOfReviews:[{type:mongoose.Schema.Types.ObjectId, ref: 'Reviews'}],
    listOfannouncements:[{type:String}]

});

Courses.methods.add = function(){

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

var Courses = mongoose.model("Course", Courses);

module.exports = Courses;