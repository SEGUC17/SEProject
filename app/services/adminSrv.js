myApp.factory('adminSrv', function($http ) {
    return {

// view all service provider
getVerifiedServiceProvider: function(){
 // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
    return $http.get('/home/viewreg');
},

// remove service provider
declineSrvProvider: function(Email){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "email": Email
      }; console.log("declineSrvProvider");
         console.log(Email);
          //console.log(Userid);
         return $http.post('/admin/declineSP'+'ID:',body);
},
//delete SP

deleteSrvProvider: function(EmaorganizationNameil){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "organizationName": organizationName
    }; console.log("deleteSrvProvider");
         console.log(organizationName);
          //console.log(Userid);
         return $http.post('/admin/deleteSP'+'ID:',body);
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
