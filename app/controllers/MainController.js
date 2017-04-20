angular.module('MainController', ['indexSrv', 'fileModelDirective','uploadFileService'])

.controller('MainController',function($scope,indexSrv,$location,$rootScope,uploadFile) {
//console.log('main')

indexSrv.getVerifiedServiceProvider().then(function(res){
	$scope.title=res.data
})

 $scope.file = {};

 $scope.Submit = function(){
 	$scope.uploading = true;
 	uploadFile.upload($scope.file).then(function(data){
        if(data.data.success){
        	$scope.uploading = false;
        	$scope.alert = 'alert alert-success';
        	$scope.message = data.data.message;
        	$scope.file = {};
        }else{
        	$scope.uploading = false;
        	$scope.alert = 'alert alert-danger';
        	$scope.message = data.data.message;
        	$scope.file = {};
        }
 	});
 }


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


			}
			else{
			 app.islogged = false;

			}


		})
	}

//student login
this.Student_login=function(data){
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){
			$location.path('/welcome')
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


});