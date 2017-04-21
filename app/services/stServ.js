angular.module('stServ',[])
.factory('stServ',function($http){

return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
   		//console.log("inside service")
   		console.log(response)
   	});
   }
}
});
