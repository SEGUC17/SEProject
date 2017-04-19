angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location) {
//console.log('main')
indexSrv.getVerifiedServiceProvider().then(function(res){
	$scope.title=res.data
})
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
	