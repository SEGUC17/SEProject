
// console.log("appp")

angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ','AdminController','adminSrv'])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
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