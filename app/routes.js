var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
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

   .when('/spPortofolio',{

    templateUrl:'views/spPortofolio.html',
   

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
   .when('/viewP',{

    templateUrl:'views/viewP.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/c',{

    templateUrl:'views/c.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/addCourse',{

    templateUrl:'views/addCourse.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    
    .when('/oneCourse',{

    templateUrl:'views/oneCourse.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
     .when('/singleCourse',{

    templateUrl:'views/singleCourse.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/studentRegister',{

    templateUrl:'views/studentRegister.html',
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
