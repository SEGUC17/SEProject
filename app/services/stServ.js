angular.module('stServ',[])
.factory('stServ',function($http){
	
return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
   		//console.log("inside service")
   		console.log(response)
   	});
   },

   typeReview : function(data){
   	return $http.post('/studentprofile/review',data).then(function(response){
   		console.log(response)
   	})
   },
   studentPayment: function(data){
      return $http.post('/charge',data).then(function(response){
         console.log(response);
      });
   }

}

});
