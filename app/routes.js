var myApp = angular.module('appRoutes',['ngRoute'])


myApp.config(function($routeProvider,$locationProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: 'views/welcome.html'

    }).when('/catalog',{
    templateUrl:'views/catalog.html'

    }).when('/welcome',{
    templateUrl:'views/welcome.html',
    controller: 'MainController',
    controllerAs: 'MainController'

    }).when('/search',{
    templateUrl:'views/search.html'

   }).when('/adminPage',{
      templateUrl:'views/adminPage.html',
      controller: 'AdminController',
      controllerAs: 'AdminController'

  }).when('/registeredSP',{
    templateUrl:'views/registeredSp.html',
    controller: 'MainController',
    controllerAs: 'MainController'

    }).when('/register',{
    templateUrl:'views/register.html',
    controller: 'spCon',
    controllerAs: 'spCon'

    }).when('/addCourse',{
    templateUrl:'views/addCourse.html',
    controller: 'spCon',
    controllerAs: 'spCon'

    }).when('/studentRegister',{
    templateUrl:'views/studentRegister.html',
    controller: 'StudentController',
    controllerAs: 'StudentController'

    }).when('/studentLogin',{
    templateUrl:'views/studentLogin.html'
    //   controller: 'StudentController',
    // controllerAs: 'StudentController'

    }).when('/test',{
    templateUrl:'views/test.html'

    }).when('/login',{
    templateUrl:'views/login.html'
    //   controller: 'MainController',
    // controllerAs: 'MainController'

    }).when('/logout',{
    templateUrl:'views/logout.html'
    //   controller: 'MainController',
    // controllerAs: 'MainController'

    }).otherwise({
    redirectTo: "/"
  });
$locationProvider.html5Mode({ enabled: true, requireBase: false });
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
