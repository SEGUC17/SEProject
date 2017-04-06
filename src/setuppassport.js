var passport = require("passport");
var User = require("./db/Student");
module.exports = function() {
  passport.serializeUser(function(user, done) {   
    done(null, user._id);                         
  });
  passport.deserializeUser(function(id, done) {   
    User.findById(id, function(err, user) {       
      done(err, user);                            
    });
  });
};
 
var LocalStrategy = require("passport-local").Strategy;
 
passport.use("login", new LocalStrategy(            
 
 function(username, password, done) {             
  User.findOne({ username: username }, function(err, user) { 
    if (err) { return done(err); }
    if (!user) {                                       
      return done(null, false, console.log("No user has that username!" ));   
    }                                                  
    user.checkPassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);         
      } else {
        return done(null, false,console.log("Invalid password" ));  
      }
    });
  });
}));