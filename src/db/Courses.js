var mongoose = require('mongoose');

var ServiceProvider = require('./ServiceProvider');
var Student = require('./Student');

var Schema = mongoose.Schema;

var Courses = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    centerName: {
        type:String,
        required:true
    },

    centerLocation: {
        type:String,
        required:true
    },

    type: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },

    startDate: {
        type:Date,
        required:true
    },

    endDate: {
        type:Date,
        required:true
    },

    capacity:{
        type:Number,
        required:true
    },

    fees:{
        type:String,
        required:true
    },

// holds the announcements of this course
    announcements: [{
        type:String
    }],

// holds all the IDs of students that are taking this course
    enrolledStudentsIDs : [{
        type: String
    }],

// holds the ID of the service provider that provides this course
    serviceProviderID:{
        type:String,
        default:0
    },

// hold the IDs of the reviews of this course
    ReviewsIDs: [{
        type: String
    }],

 countNeg:{
    type: Number,
    default:0

 },
 totalCount:{
   type: Number,
   default: 0
 }

})


module.exports.updateCourse = (title, course,options, callback) => {
    var query = {title:title};
    Courses.update(query, course, options,callback);
}

var Courses = mongoose.model("Course", Courses);

module.exports = Courses;