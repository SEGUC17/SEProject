var Course=require('../db/Courses');
var sp = require('../db/ServiceProvider');

let ServiceProviderController = {

  addSP: function(ServiceProvider){ // I know we don't add SPs but this is just an example 
  	ServiceProvider.save(function(err){
		if(err){
			console.log(err);

		}else{
			console.log("done");
		}

	})

	

  }
}

module.exports = ServiceProviderController;