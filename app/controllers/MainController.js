angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location) {
//console.log('main')

indexSrv.getVerifiedServiceProvider().then(function(res){
	$scope.title=res.data
})



	if(indexSrv.IsLoggedIn()){
		console.log("user logged in")
		indexSrv.GetCurrentUser().then(function(response){
			console.log(response);
		});
	}else
	{
	console.log("user not  logged in")

	}


	this.login=function(data){
		indexSrv.ServiceProviderLogin(this.data).then(function(response){
		//	console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.success==true)
			$location.path('/welcome')

		})
	};

	this.logout=function(){
		indexSrv.LogOut();
		console.log("log")
	   // $location.path('/')


	}




  //
  // indexSrv.getCatalogPage();
//$location.url('/welcome');
// $scope.search = function() {
       
//         $location.url('/search');
        
//     };


// indexSrv.spRegister($scope.sp).then(function)(res){
//         $location.url('/register');

// }


  
});
	