angular.module('indexSrv', [])

myApp.factory('indexSrv', function($http,AuthToken) {
    return {
  
    	getOtherStripePupKey: function(airlineIP , jwt) {
        //jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
          return $http.get('/data/otherStripeKey/'+airlineIP+'?wt='+jwt);
      },
        getUnverifiedServiceProvider: function(){
          console.log("in srv");
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
        
          return $http.get('/home/viewreg');

      },
        getServiceProviderInstant: function() {
            return this.SP;
        },
        setServiceProviderInstant: function(value) {
            this.SP = value;
        },
        getCatalogPage : function(){
          $http.get('/home/views/catalog');
        },


       ServiceProviderLogin:function(data){
       return $http.post('/forbussinus/login',data).then(function(response){
           AuthToken.SetToken(response.data.token)
         console.log(response.data)
            return response;
       });
       
       },

       IsLoggedIn: function(){

       if(AuthToken.GetToken()){
         return true;
       }else{
         return false;
       }

      },

      LogOut: function(){
        AuthToken.SetToken(); 
        console.log("logout from indexSrv")
      },

      GetCurrentUser:function(){
        if(AuthToken.GetToken()){
          return $http.post('/ServiceProvider/me');
        }else
        {
          $q.reject({message:"user has no token"})
        }
      }


    };
})
.factory('AuthToken',function($window){
 return{

   SetToken : function(token){
    if(token){

     $window.localStorage.setItem('token',token)
    }else{
     $window.localStorage.removeItem('token')

    }
   },
   // AuthToken.GetToken()
   GetToken: function(){
     return $window.localStorage.getItem('token')
   }

 }
})