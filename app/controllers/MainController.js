<<<<<<< HEAD
myApp.controller('MainController', function($scope,indexSrv,$location) {

$scope.title=  '' ;

$location.url('/adminPage');

//$scope.count = 0;
// $scope.IsVisible = false;
// $scope.ShowHide = function () {
//     //If DIV is visible it will be hidden and vice versa.
//     $scope.IsVisible = $scope.IsVisible ? false : true;
//     // if($scope.IsVisible===false){
//     //   $scope.IsVisible=true;
//     //   return "here 1";
//     // }else if ($scope.IsVisible=== true) {
//     //   $scope.IsVisible=false;
//     //   return "here 2";
//     // }
//
// };
// //getServiceProvider();
//     function getServiceProvider(){
//
//     indexSrv.getAllVerifiedServiceProvider().success(function(Sp) {
//
//        indexSrv.setSP(Sp);
//        $scope.title  =indexSrv.getSP(Sp);
//        });
//      };
=======
angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {
//console.log('main')

indexSrv.getVerifiedServiceProvider().then(function(res){
	$scope.title=res.data
})
var app = this;

$rootScope.$on('$routeChangeStart',function(){
if(indexSrv.IsLoggedIn()){
console.log("success user is logged in")
indexSrv.GetCurrentUser().then(function(data){
console.log(data.data.username)
 $scope.SPusername=data.data.username
  app.islogged = true;

         });
      }
         else
          {
  console.log("failure user is not logged")
  	$scope.SPusername='';
    }




})


	this.login=function(data){
		indexSrv.ServiceProviderLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.success==true){
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




  //
  // indexSrv.getCatalogPage();
// $location.url('/welcome');
// $scope.search = function() {
       
//         $location.url('/search');
        
//     };


// indexSrv.spRegister($scope.sp).then(function)(res){
//         $location.url('/register');

// }
>>>>>>> frontend_backend_combined


});
