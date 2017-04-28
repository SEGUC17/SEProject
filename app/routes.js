var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

.when('/studentprofile',{

    templateUrl:'views/studentprofile.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })

   
    .otherwise({
    redirectTo: "/"
  });

    
  

});
