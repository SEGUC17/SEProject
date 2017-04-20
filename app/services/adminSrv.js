myApp.factory('adminSrv', function($http ) {
    return {

// view all service provider
getVerifiedServiceProvider: function(){
 // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
    return $http.get('/home/viewreg');
},

// remove service provider
declineSrvProvider: function(Email , token){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "email": 'bazo11@gmail.com' ,
      "token":token

      }; console.log("declineSrvProvider");
         console.log(Email);
         return $http.post('/admin/declineSP',body);
},

// delete sp
deleteSrvProvider: function(Email){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "email": Email

      }; console.log("deleteSrvProvider");
         console.log(Email);
         return $http.post('/admin/deleteSP',body);
},



//view Unverify service provider
viewUnSrvProvider: function(){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
  //   console.log("viewUnSrvProvider");
    // console.log(username);
          return $http.post('/adminhomepage/viewunreg');
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

setEmail: function(value) {
    this.Email = value;
}

    };
 });
