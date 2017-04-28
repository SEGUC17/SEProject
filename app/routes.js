var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: 'index.html',
    controller: 'MainController',
    controllerAs: 'MainController'
  })
  
});