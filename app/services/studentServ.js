angular.module('studentServ',[])
.factory('studentServ',function($http){
	
return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
   		console.log("inside service")
   		console.log(response)
   	});
   }


}

});