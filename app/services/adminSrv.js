myApp.factory('adminSrv', function($http ) {
    return {

      removeSrvProvider: function(Email){
       // jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNWU5LU0giLCJpYXQiOjE0NjA3NzIyOTQsImV4cCI6MTQ5MjMwODI5NSwiYXVkIjoid3d3LnNlY291cnNlLmNvbSIsInN1YiI6Ik1ZTktTSCBJYmVyaWEiLCJUZWFtIjoiTVlOS1NIIn0.hZxhv8XAcu1cARgcrtfb0l_crF1-Ic1tJt9eUhIL0qQ';
       var body = {
      "email": Email

    }; console.log("srv");
     console.log(Email);
          return $http.post('/adminhomepage/decline',body);
      },
      getEmail: function() {
          return this.Email;
      },

      setEmail: function(value) {
          this.Email = value;
      }

    };
});
