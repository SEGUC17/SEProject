angular.module('courseServ',[])

.factory('courseServ', function($http) {
    return {
    	viewreviews:function(data){
    		return $http.post('/serviceprovider/ViewReviews',data);


    	},
        removeCourse: function(data){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
        
          return $http.post('/serviceprovider/courses/removeCourse',data);
//lessa mesh aarfa l pathhhhhh

      },

      
        postannouncement: function(data){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
        
          return $http.post('/serviceprovider/postannouncement',data);
          console.log(response)

      },

        updatecourse: function(data){

        return $http.post('/serviceprovider/courses/update',data).then(function(response){
      
      console.log(response)
    });
        
      },

      viewannouncements:function(data){
        return $http.post('/serviceprovider/viewannonnoucement',data);


      }
  
       
    };
});



