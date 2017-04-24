angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','AdminController','adminSrv','spctr','fobusinessServ','spAuthServ','StudentController','stServ'])



angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ'])

angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ','AdminController','adminSrv'])



.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
});
