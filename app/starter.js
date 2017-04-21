
angular.module('myApp', ['ui.bootstrap','appRoutes','MainController','indexSrv','spctr','businessServ','spAuthServ','StudentController','stServ'])


.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptors')
});
