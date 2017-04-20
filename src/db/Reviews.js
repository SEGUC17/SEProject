var mongoose = require("mongoose");
var Schema = mongoose.Schema;





var Reviews = mongoose.Schema({
 
// holds the student ID who has written the review
  StudentID: {
  	type: String,
    required:true
  },
 
  review: {
  	type: String,
    required:true
  },
 
// to determine whether the review is +ve or -ve
  isNeg:{
    type:Boolean,
    required:true
  },
 
// holds the course ID which has been reviewed
  courseID: {
  	type: String
  }
 
});



var review  = mongoose.model("Reviews", Reviews);



module.exports = review;