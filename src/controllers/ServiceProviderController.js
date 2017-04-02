let Course=require('../db/Courses');
let sp = require('../db/ServiceProvider');

let ServiceProviderController = {

  addSP: function(ServiceProvider){ // I know we don't add SPs but this is just an example
  	ServiceProvider.save(function(err){
		if(err){
			console.log(err);

		}else{
			console.log("done");
		}

	})
 },

//   getAllServiceProvider:function(req, res){
//       if(req.session.passport !== null && req.session.passport.user !== null){
//         sp.find(function(err, user) {
//
//           if(err){
//             //  res.send(err.message)
//               console.log(err);
//           }
//           else{
//             filtered_ServiceProviders = [];
//             console.log(req.body);
//             for(var i=0; i<ServiceProviders.length;i++){
//
//                 filtered_ServiceProviders.push(ServiceProviders[i])
//                 console.log("filtered_ServiceProviders",filtered_ServiceProvide);
//               }
//
//             }
//       })
//   }
// }
  getAllVerifiedServiceProvider:function(username, password){
    //  let ServiceProvider = new sp(username);
      sp.find({username:!undefined},function(err,spUsers) {
        if (err) {
          console.log(err);
          console.log("errooooorrrrrrr");
        } else{
        if (spUsers!=null) {
         filtered_ServiceProviders = [];
    //     console.log(req.body);
       for(var i=0; i<spUsers.length;i++){
         filtered_ServiceProviders.push(spUsers[i])
       console.log("filtered_ServiceProviders",filtered_ServiceProviders);
         }
      }
    }
    });
  },


}// big end

module.exports = ServiceProviderController;
