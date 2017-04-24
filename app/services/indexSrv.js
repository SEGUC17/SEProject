angular.module('indexSrv', [])

myApp.factory('indexSrv', function($http,AuthToken) {
  

  var savedData={}
    return {
       postReview:function(data){
        return $http.post('/studentprofile/review',data).then(function(response){
         console.log('get revieww ' )
         console.log(response)
            return response;
           });

          },

     set:function(data){
      savedData=data;
     },
    get : function(){
       return savedData;
    },

       getStudentProfile:function(data){
              return $http.post('/studentprofile',data).then(function(res){
                console.log(res)
                return res;
              });
       
       },
         getCatalog : function(){
                  return $http.get('/catalog');
          },
       //      getStudentProfile:function(){
       //        return $http.get('/studentprofile');
       
       // },
  
 combine:function(data1,data2){
      var obj={
        courseTitle :data1.title,
        announcement :data2
      }
     savedData=obj;
  },
   removeAnnouncements :function(data){
       return $http.post('/serviceprovider/removeannouncement',data).then(function(response){
         //console.log(response)
            return response;
       });
     },



   Search:function(data){
        return $http.post('/home/search',data);
     },

///////////////////////////////
getOtherStripePupKey: function(airlineIP , jwt) {
        //jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
          return $http.get('/data/otherStripeKey/'+airlineIP+'?wt='+jwt);
      },
        getVerifiedServiceProvider: function(){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';

          return $http.get('/adminhomepage/verify');

      },
        getSelectedCardNo: function() {
            return this.SelectedCardNo;
        },
        setSelectedCardNo: function(value) {
            this.SelectedCardNo = value;
        },

        // getCatalogPage : function(){
        //   $http.get('/home/views/catalog');
        // },
        ///////////////////////////////////////////
// THIS IS THE ROUTE OF SPLOGIN , AUTHTOKEN.SETTOKEN TAKE THE USER TOKEN AND SAVES IT IN THE LOCALSTRATEGY SO THAT
// ANY FUNCTION WHICH NEEDS TOKEN AS INPUT WILL BE AUTOMATICALY TAKEN FROM HERE

       ServiceProviderLogin:function(data){
       return $http.post('/forbussinus/login',data).then(function(response){
          AuthToken.SetToken(response.data.token)
         //console.log(response)
            return response;
       });
       
       },


       StudentLogin:function(data){
       return $http.post('/login',data).then(function(response){
          AuthToken.SetToken(response.data.token)
         //console.log(response)
            return response;
       });
       
       },



// function that return true if the user is logged in or return false when user is not logged in
// it uses the function getToken() to check if there is a token , if there is token , the function will return true 
// if there is no token the function will return false
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


// function which return the current user
      GetCurrentUser:function(){
        if(AuthToken.GetToken()){
          console.log('i have token')
          return $http.post('/me');
        }else
        {
          $q.reject({message:"user has no token"})
        }
      },
      GetToken:function(){
        return AuthToken.GetToken();

      }


    }
})


.factory('AuthToken',function($window){
 return{

// set token is  a function which takes parameter token and set  it to the localSTorage of the user
   SetToken : function(token){
    if(token){

     $window.localStorage.setItem('token',token)
    }else{
     $window.localStorage.removeItem('token')

    }



   },
   // function which retrieves the token from the localStorage
   GetToken: function(){
     return $window.localStorage.getItem('token')
   }

 }

});

.factory('AuthInterceptors',function(AuthToken){
  return{

    request: function(config){
      var token= AuthToken.GetToken();
      if(token) 
        config.headers['x-access-token']= token;
      return config;

    }


  }
})