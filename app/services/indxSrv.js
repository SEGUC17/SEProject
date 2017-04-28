angular.module('indexSrv', [])

myApp.factory('indexSrv', function($http,AuthToken) {
 
     var savedData ={}
    return {
        set: function(data) {
           savedData = data;
          },
           get :function(){
          return savedData;
         },
        getStudentProfile:function(){
              return $http.get('/studentprofile');
       
       }
     }
   })