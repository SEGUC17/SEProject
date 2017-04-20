
angular.module('searchServ',[])

.factory('searchServ', function($http) {
    return {
           	Search:function(key,searchBy){
    		return $http.post('/serviceprovider/register',key,searchBy);


        } 
    };
})



