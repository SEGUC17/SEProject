var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

    .when('/', {
    templateUrl: 'views/welcome.html',
    // controller: 'MainController',
    // controllerAs: 'MainController'
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
    //   controller: 'MainController',
    // controllerAs: 'MainController'



    })
    .when('/logout',{

    templateUrl:'views/logout.html'
    //   controller: 'MainController',
    // controllerAs: 'MainController'



    }).
   when('/search',{

    templateUrl:'views/search.html',


    }).
    when('/signUp',{

    templateUrl:'views/studentRegister.html',
     controller:'studentController',
     controllerAs:'studentController'

    }).when('/adminPage',{
      templateUrl:'views/adminPage.html',
      controller: 'AdminController',
      controllerAs: 'AdminController'
  })
    .otherwise({
    redirectTo: "/"
  });




});
