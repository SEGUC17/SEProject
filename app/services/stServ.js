angular.module('stServ',['indexSrv'])
.factory('stServ',function($http,indexSrv){
	
return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
         console.log("resssssssssssss")
   	 indexSrv.set(response);
         
   		console.log(response)
   	});
   	}
      ,
     studentPayment: function(data){
      return $http.post('/charge',data).then(function(response){
      	console.log("HENAAA");
         indexSrv.set(response);
         console.log(response);
      });
   }
   }




});
