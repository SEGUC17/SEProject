var mongoose = require("mongoose");

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



var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin ;
