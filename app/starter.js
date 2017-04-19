 
// console.log("appp")

var myApp = angular.module('myApp', ['ui.bootstrap','ngRoute','MainController','indexSrv','spctr','businessServ','spAuthServ']);


myApp.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: 'views/welcome.html',
    // controller: 'MainController',
    // controllerAs: 'MainController'
               })
    .
    when('/catalog',{

    templateUrl:'views/catalog.html'

    }).
    when('/welcome',{

    templateUrl:'views/welcome.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    }).
    when('/search',{

    templateUrl:'views/search.html',
   

    }).
    when('/login',{

    templateUrl:'views/login.html',
   

    })

   .when('/registeredSP',{

    templateUrl:'views/registeredSp.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })
   .when('/register',{

    templateUrl:'views/register.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
   .when('/test',{

    templateUrl:'views/test.html'
    

    })
    .when('/login',{

    templateUrl:'views/login.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    

    })
    .when('/logout',{

    templateUrl:'views/logout.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    

    })
    .otherwise({
    redirectTo: "/"
  });

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
