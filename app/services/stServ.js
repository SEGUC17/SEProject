angular.module('stServ',[])
.factory('stServ',function($http){
	
return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
   		//console.log("inside service")
   		console.log(response)
   	});
   	}
      ,
     studentPayment: function(data){
      return $http.post('/charge',data).then(function(response){
      	console.log("HENAAA");
         console.log(response);
      });
   },
   viewreviews:function(data){
      return $http.post('/student/viewreviews',data).then(function(response){
         console.log('WALHII HENAA');
         console.log(response)
         return response;
      })
   }
   }




});
