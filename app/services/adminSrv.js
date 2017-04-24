angular.module('adminSrv', [])
.factory('adminSrv', function($http ) {
    return {

// view all service provider
getVerifiedServiceProvider: function(token){
 // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';

 var body = {

"token":token

};
    return $http.post('/adminhomepage/verify',body);
},

// remove service provider
declineSrvProvider: function(Email , token){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "email": Email ,
      "token":token

      }; console.log("declineSrvProvider");
         console.log(Email);
         return $http.post('/admin/declineSP',body);
},


//verify SP
VerifySrvProvider: function(username,password,email, token){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "username":username,
      "password":password,
      "email":email,
      "token":token

      }; console.log("VerifySrvProvider");
         console.log(username);
         console.log(password);
         console.log("----------");
         console.log(token);

        return $http.post('/adminhomepage/verify',body);
},



// // delete sp
// deleteSrvProvider: function(Email){
//        // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
//        var body = {
//       "email": Email
//
//       }; console.log("deleteSrvProvider");
//          console.log(Email);
//          return $http.post('/admin/deleteSP',body);
// },



//view Unverify service provider
viewUnSrvProvider: function(token){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
  //   console.log("viewUnSrvProvider");
    // console.log(username);
      var body = {
     "token":token

     };
      return $http.post('/adminhomepage/viewunreg',body);
},

getSP: function() {
    return this.SP;
},
setSP: function(value) {
    this.SP = value;
},

getEmail: function() {
    return this.Email;
},

getNotifications :function(){
  console.log("adminSrv notificationssss")
  
 return  $http.post('/adminhomepage/getNotifications');

}
,
setEmail: function(value) {
    this.Email = value;
}

    };
 });
