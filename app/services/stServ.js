angular.module('stServ',['indexSrv'])
.factory('stServ',function($http,indexSrv){
	
return{

   studentRegister : function(data){
      return $http.post('/register',data).then(function(response){
         // console.log("resssssssssssss")
       indexSrv.set(response);
         
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
   ,
   bookCourse : function(data){
      console.log("baraa");
       return $http.post('/coursepage/bookcourse',data);
      
   }





   }




});
