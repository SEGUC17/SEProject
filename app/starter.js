
<<<<<<< HEAD
var myApp = angular.module('myApp', ['ui.bootstrap','StudentController','stServ','appRoutes','ngRoute','MainController','PopupDemoContUpdateCourse','PopupDemoContRemoveCourse','PopupPostAnnouncement','serviceProviderController','indexSrv','courseServ','spctr','businessServ','spAuthServ']);


myApp.config(function($routeProvider) {
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
      controller: 'spCon',
    controllerAs: 'spCon'

    

    })
    .when('/postAnnouncementsPopUp',{

    templateUrl:'views/postAnnouncementsPopUp.html'
     controller: 'PopupPostAnnouncement',
    controllerAs: 'PopupPostAnnouncement'

    })
    .when('/removeCoursePopUp',{

    templateUrl:'views/removeCoursePopUp.html'
    controller: 'PopupDemoContRemoveCourse',
    controllerAs: 'PopupDemoContRemoveCourse'

    })
    .when('/updateCoursePopUp',{

    templateUrl:'views/updateCoursePopUp.html'
    controller: 'PopupDemoContUpdateCourse',
    controllerAs: 'PopupDemoContUpdateCourse'

    })
   //  .
   //   when('/Popup',{

   // templateUrl:'views/Popup.html',
   

   //   })
    .otherwise({
    redirectTo: "/"
  });
=======
// console.log("appp")

angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ'])
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
});
