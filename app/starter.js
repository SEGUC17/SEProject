
// console.log("appp")

var myApp = angular.module('myApp', ['ui.bootstrap','ngRoute','MainController','PopupDemoContUpdateCourse','PopupDemoContRemoveCourse','PopupPostAnnouncement','serviceProviderController','indexSrv','courseServ','spctr','businessServ','spAuthServ']);


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
