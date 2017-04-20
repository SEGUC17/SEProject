var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var Schema = mongoose.Schema;

var adminSchema = Schema({
  username: { type: String, unique: true, default: "Admin"},
  password: { type: String, required: true },
  name: { type: String},
  picture:{ type: String},
  email:{type: String, required: true},
  Birthdate: {type: Date},
  listOfNotification: [{
  	typeOfNotification:String,
  	ServiceProviderUsername:String
  }]

});


adminSchema.pre("save", function(done) {
  var admin = this;
  if (!admin.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(admin.password, salt, null, function(err, hashedPassword) {
      if (err) { return done(err); }
      admin.password = hashedPassword;
      done();
    });
  });
});
adminSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin ;

var a = new Admin({
   username: "Admin",

  password: "Admin",

  email:"habibahshm11@gmail.com"
});


var InsertAdmin=function(a){
  a.save((err)=>{
    if(err)
      throw err
    else
      console.log("ADDED");

  })
}

//InsertAdmin(a);
