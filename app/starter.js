
// console.log("appp")
angular.module('myApp', ['ngRoute','ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','studentServ','studentController'])

<<<<<<< HEAD
myApp = angular.module('myApp', ['ui.bootstrap','ngRoute']);


myApp.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
      templateUrl: '/index.html',
      controller: 'MainController',
      controllerAs: 'MainController'

    }).when('/catalog',{

      templateUrl:'/catalog.html'

    }).when('/welcome',{

      templateUrl:'views/welcome.html',
      controller: 'MainController',
      controllerAs: 'MainController'

    }).when('/search',{

     templateUrl:'views/search.html',

    }).when('/adminPage',{
      templateUrl:'views/adminPage.html',
      controller: 'AdminController',
      controllerAs: 'AdminController'
  })
=======
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
>>>>>>> frontend_backend_combined

});


// myApp.controller('MainController',['$scope',function($scope){

//   $scope.title='Top Sellers in Books' ;

// }])


// angular.module('myApp', []).controller('myAppCtrl', function($scope) {

//     $scope.title = 'Nothing beats a pocket protector!';

// });

 // myApp.factory('myApp', function(){
 //        return { message: "I'm Data from a Service" }
 //    });


// app.controller('MainController',['$scope',function($scope){

//   $scope.title='Top Sellers in Books' ;

// }])
