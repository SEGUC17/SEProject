var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider, $locationProvider) {
  $routeProvider

    .when('/', {
    templateUrl: 'views/welcome.html',
               })
    .when('/catalog',{
    templateUrl:'/catalog.html'
    }).when('/welcome',{

    templateUrl:'views/welcome.html',
      controller: 'MainController',
    controllerAs: 'MainController'
    }).
   when('/search',{
    templateUrl:'views/search.html',
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
    templateUrl:'views/login.html'
    })
    .when('/logout',{
    templateUrl:'views/logout.html'
    }).
   when('/search',{
    templateUrl:'views/search.html',
    }).
    when('/signUp',{
    templateUrl:'views/studentRegister.html',
     controller:'studentController',
     controllerAs:'studentController'
    })
    .when('/about',{
      templateUrl:'views/about.html'
    })
    .when('/admin',{
      templateUrl:'views/admin/admin.html'
    })
    .otherwise({
    redirectTo: "/"
  })
    $locationProvider.html5Mode({ enabled: true, requireBase: false });
    // Required to remove AngularJS hash from URL (no base is required in index file);
});
