
angular.module('searchServ',[])

.factory('searchServ', function($http,AuthToken) {
    return {
    	Search:function(key,searchBy){
    		return $http.post('/serviceprovider/register',key,searchBy);


    	}