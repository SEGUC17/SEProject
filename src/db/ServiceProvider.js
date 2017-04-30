
var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Course=require('./Courses');

var Admin = require('./Admin');
var moment = require('moment');
var SALT_FACTOR = 10;

var ServiceProviderSchema=mongoose.Schema({

	username:{
		type:String,
		default:""
		// required:true
	},
	expirationDate:{
		type:Date
	},
	password:{
		type:String
			},
	organizationName:{
		type:String,
		unique:true
		//required:true
	},
	field :{
		type:String,
		required:true
	},
	description :{
		type:String,
		required:true
	},
	mobileNumber :{
		type:String,
		required:true,
		unique:true
	},
	email :{
		type: String, 
		required: true, 
		unique:true
	},
	address :{
		type:String,
		required:true
	},
	polices:{
		type:String,
		required:true
	},
	logo :{
		type:String,

	},
	listOfCourses:

		[{type:String}], 
		// carries the IDs of the courses which are provided with this service provider

	listOfNotification: [{typeOfNotification:String}]

});



ServiceProviderSchema.pre("save", function(done) { // cryption for password
  var ServiceProvider = this;
  if (!ServiceProvider.isModified("password")) {
  	console.log("not changed");

    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err); }
    bcrypt.hash(ServiceProvider.password, 
salt, null, function(err, hashedPassword) {
      if (err) { return done(err); }
      ServiceProvider.password = hashedPassword;
      done();
    });
  });
});
ServiceProviderSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};



module.exports.loop = function(){
	ServiceProvider.find(function(err,docs){
		console.log(docs.length);
		for(var i = 0; i < docs.length; i++){
			console.log(docs[i].username);
			ServiceProvider.sendNotification(docs[i].username);
		}
	})
}




// when the expiration date of the service Provider's contract is equal to date.now , this function push a notification
// in the list of notification in the service provider and push a notification along with the username of the service provider
//to the list of notifications of the Admin
module.exports.sendNotification=function(username){


	ServiceProvider.findOne({username:username},function(err,res){
		if(err)
			console.log(err)
		
		var y = 0;
		var SPExpirationDate = moment(res.expirationDate).format('MM/DD/YYYY')
	

			 //console.log(u)
					// console.log(moment(res.expirationDate).format('YYYY-MM-DD'))
			  // console.log(moment(Date.now()).format('YYYY-MM-DD')+"datenow")
			
		if(SPExpirationDate == moment(Date.now()).format('MM/DD/YYYY'))
			y = 1;
		
		if(y==1){

			var item ={
				typeOfNotification:"EXPIRATION DATE**"
			}

			ServiceProvider.update(res,{"$addToSet":{listOfNotification:item}} ,function(err,res){
				if(err)
					console.log(err);
				else
					console.log("updated")
			})

		
			var item2={
			typeOfNotification:"EXPIRATION DATE",
			ServiceProviderUsername:res.username
			}

			Admin.findOne({username:'Admin'},function(err,resx){
				console.log(resx)
				Admin.update(resx,{$push:{ listOfNotification :item2}},{safe:true,upsert:true},function(err,ress) {
				if(err)
					console.log(err);
				else
					console.log("updated")

				})

			})

			

			console.log("expired");

		} else

			console.log("not yet")
	})

}



// to run the notification system
//ServiceProvider.loop();
  
var InsertServiceProvider=function(sp){
	sp.save((err)=>{
		if(err)
			throw err
		else
			console.log("ADDED");

	})
}



var ServiceProvider = module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);