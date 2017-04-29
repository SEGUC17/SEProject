
// console.log("appp")

angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ','AdminController','adminSrv'])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
});


