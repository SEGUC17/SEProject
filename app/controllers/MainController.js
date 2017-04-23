angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {
//console.log('main')
var app = this;

// indexSrv.getVerifiedServiceProvider().then(function(res){
// 	$scope.title=res.data.content;
// 	console.log("RESOPNSEEE");
// 	console.log(res);
// })



			



			if(indexSrv.IsLoggedIn()){
			console.log("success user is logged in")
			indexSrv.GetCurrentUser().then(function(data){
			console.log(data.data)
			 $scope.SPusername=data.data.decoded.username
				$scope.typeUser=data.data.decoded.type
				console.log(data.data.decoded.type);
			 if(data.data.decoded.type=="ServiceProvider"){
			 	app.IsServiceProvider=true;
			 }else{
			 	app.IsServiceProvider=false;
			 }
			 console.log(data.data.decoded.type=="ServiceProvider");
			  app.islogged = true;

			         });
			      }
			         else
			          {
			  console.log("user is not logged")
			  	$scope.SPusername='';
			    }


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

			}


		})
	}

//student login
this.Student_login=function(data){
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS' && response.data.type=="Student"){
			$location.path('/welcome')
			app.islogged = true;
			}
			else{
				if(response.data.type=='SUCCESS' && response.data.type=="Admin"){
					//Changes to the URL in the address bar are reflected into the $location service and changes to 
					//$location are reflected into the browser address bar
					app.islogged = true;
					$location.path('/adminPage');
				}
				else{
			 app.islogged = false;
			}

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
	