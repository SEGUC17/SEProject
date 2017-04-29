var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {

$routeProvider
.when('/catalog',{

  templateUrl:'views/catalog.html'

  })
  .when('/catalogedu',{

templateUrl:'views/catalogedu.html'

})
.when('/catalogmusic',{

templateUrl:'views/catalogmusic.html'

})
.when('/catalogfun',{

templateUrl:'views/catalogfun.html'

})

});
