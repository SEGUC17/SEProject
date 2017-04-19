
// console.log("appp")

myApp = angular.module('myApp', ['ui.bootstrap','ngRoute']);


myApp.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: '/index.html',
    controller: 'MainController',
    controllerAs: 'MainController'
               })
    .when('/catalog',{

    templateUrl:'/catalog.html'

    })
    .when('/welcome',{

    templateUrl:'app/views/welcome.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })
   .when('/search',{

    templateUrl:'app/views/search.html',
   })

   .when('/catalog',{

    templateUrl:'app/views/catalog.html',
   })

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
