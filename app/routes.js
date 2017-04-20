var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: 'views/welcome.html',
    // controller: 'MainController',
    // controllerAs: 'MainController'
               })
    .when('/viewCourse',{
      templateUrl:'views/ViewCourse.html',
      controller:'spCon',
      controllerAs:'spCon'


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
    .when('/addCourse',{

    templateUrl:'views/addCourse.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/studentRegister',{

    templateUrl:'views/studentRegister.html',
      controller: 'StudentController',
    controllerAs: 'StudentController'

    })

    .when('/charge',{

    templateUrl:'views/stripe.html',
      controller: 'StudentController',
    controllerAs: 'StudentController'

    })
    .when('/studentLogin',{

    templateUrl:'views/studentLogin.html'
    //   controller: 'StudentController',
    // controllerAs: 'StudentController'

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

    

    })
    .otherwise({
    redirectTo: "/"
  });

    
  

});
