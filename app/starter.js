angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','AdminController','adminSrv','spctr','fobusinessServ','spAuthServ','StudentController','stServ'])

.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
});
