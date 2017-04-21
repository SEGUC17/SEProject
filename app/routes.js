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

    })
    .when('/welcome',{

    templateUrl:'views/welcome.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    }).
   when('/search',{

    templateUrl:'views/search.html',
   

    })
   .when('/removeCourse',{

    templateUrl:'views/removeCourse.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/coursepage',{

    templateUrl:'views/coursepage.html',
    controller: 'spCon',
    controllerAs:'spCon' 

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
   .when('/typereview',{

    templateUrl:'views/typereview.html',
      controller: 'StudentController',
    controllerAs: 'stCtr'

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
 .when('/postannouncement',{

    templateUrl:'views/postannouncement.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
 .when('/viewannouncements',{

    templateUrl:'views/viewannouncements.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
 .when('/viewreviews',{

    templateUrl:'views/viewreviews.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/studentLogin',{

    templateUrl:'views/studentLogin.html'
    //   controller: 'StudentController',
    // controllerAs: 'StudentController'

    })
    .when('/home',{

    templateUrl:'views/coursesp.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/updatecourse',{

    templateUrl:'views/updatecourse.html',
      controller: 'spCon',
      controllerAs: 'spCon'

    })
    .when('/coursesp',{

    templateUrl:'views/coursesp.html'
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
    .when('/charge',{

    templateUrl:'views/stripe.html',
      controller: 'StudentController',
    controllerAs: 'StudentController'

    })
    .otherwise({
    redirectTo: "/"
  });

    
  

});
