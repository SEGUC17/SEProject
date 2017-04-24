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
    
  .when('/welcome',{

    templateUrl:'views/welcome.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })
  .when('/studentprofile/review',{

    templateUrl:'views/review.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })
  ////////////////////////
  .when('/adminPage',{

    templateUrl:'views/adminPage.html',
    controller: 'AdminController',
    controllerAs: 'AdminController'

    })
  ///////////////////////
.when('/studentprofile',{

    templateUrl:'views/studentprofile.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })

    .when('/listOfCourses',{

    templateUrl:'views/listOfCourses.html',
      controller: 'MainController',
    controllerAs: 'MainController'

    })
  .when('/search',{


    templateUrl:'views/search.html',
   

    })


  .when('/updatePortofolio',{

    templateUrl:'views/SPUpdatePortofolio.html',
      controller: 'spCon',
    controllerAs: 'spCon'

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

    .when('/index2',{

    templateUrl:'/index2.html'
    //   controller: 'StudentController',
    // controllerAs: 'StudentController'

    })
    .when('/studentprofile',{

    templateUrl:'views/studentprofile.html',
      controller: 'MainController',
    controllerAs: 'MainController'

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
    .when('/updatecourse',{

    templateUrl:'views/updatecourse.html',
      controller: 'spCon',
      controllerAs: 'spCon'

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
 .when('/viewannouncements1',{

    templateUrl:'views/viewannouncements1.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
    .when('/charge',{
 
    templateUrl:'views/stripe.html',
      controller: 'StudentController',
    controllerAs: 'StudentController'
 
    })
 .when('/viewreviews',{

    templateUrl:'views/viewreviews.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
 .when('/home',{

    templateUrl:'views/coursesp.html',
      controller: 'spCon',
    controllerAs: 'spCon'

    })
 .when('/home1',{

    templateUrl:'views/coursepage.html',
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

    .when('/Dashboard',{

    templateUrl:'views/Dashboard.html'
    // controller: 'AdminController',
    // controllerAs: 'AdminController'

    })

    .otherwise({
    redirectTo: "/"
  });

    
  

});
