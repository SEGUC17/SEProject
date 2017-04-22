angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {
	//console.log('main')
	// $location.path('/adminPage');

	indexSrv.getVerifiedServiceProvider().then(function(res){
		$scope.title=res.data
	})


	var app = this;

	$rootScope.$on('$routeChangeStart',function(){



		if(indexSrv.IsLoggedIn()){
			console.log("success user is logged in")
			indexSrv.GetCurrentUser().then(function(data){
				console.log(data.data)
				$scope.SPusername=data.data.decoded.username
				app.islogged = true;

			});
		}
		else
		{
			console.log("user is not logged")
			$scope.SPusername='';
		}




	})


	this.login=function(data){
		indexSrv.ServiceProviderLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){

				$location.path('/welcome')
				app.islogged = true;

				if(response.data.decoded.type==='Admin'){

					$location.path('/adminPage')
					app.islogged = true;

				}

			}
			else{
				app.islogged = false;

			}


		})
	};

	//student login
	this.Student_login=function(data){
		console.log("blabizooooo:: "+data);
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log("app.data :");
			console.log(app.data);
			// console.log("the token is: "+response.data.token);
			console.log("admin/student ::  ");
			console.log(response.data);
			console.log("admin::  ");
			console.log(response.data.content.username);

			if(response.data.type=='SUCCESS'){
				//response.data.content.type ==='Admin'
				// change true to type of user elly da5l == admin
				console.log("nada admin ");
				console.log(response.data.content.username);
				if(response.data.content.username=='Admin')	{ // change true to type of user elly da5l == admin
					console.log("admin :: "+response.data.content);
					console.log("admin type ::  "+response.data);
					$location.path('/adminPage');

				}//console.log("student"+response.data.decoded.username);
				else {
					$location.path('/welcome');
				}
				app.islogged = true;
			}
			else{
				app.islogged = false;

			}


		})
	}




	this.logout=function(){
		indexSrv.LogOut();
		console.log("log")
		$location.path('/')


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
