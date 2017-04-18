angular.module('businessServ',[])

.factory('businessServ', function($http,AuthToken) {
    return {
    	ServiceProviderRegister:function(data){
    		return $http.post('/serviceprovider/register',data);


    	}

    	// ServiceProviderLogin:function(data){
    	//  return $http.post('/forbussinus/login',data).then(function(response){
    	//  		  AuthToken.SetToken(response.data.token)
    	//  		 //console.log(response.data.token)
    	//  		 return response;
    	//  });
    	 

    	//}

    	// IsLoggedIn: function(){

    	// 	if(AuthToken.GetToken()){
    	// 		return true;
    	// 	}else{
    	// 		return false;
    	// 	}

    	// }



    
    };
})

// .factory('AuthToken',function($window){
// 	return{

// 		SetToken : function(token){
// 			$window.localStorage.setItem('token',token)
// 		},
// 		// AuthToken.GetToken()
// 		GetToken: function(){
// 			return $window.localStorage.getItem('token')
// 		}

// 	}
// })