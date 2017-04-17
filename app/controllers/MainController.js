

myApp.controller('MainController', function($scope,indexSrv,$location) {

  $scope.title=  "youmnaaa" ;
  // indexSrv.getVerifiedServiceProvider();
  // indexSrv.getCatalogPage();
$location.url('/welcome');
$scope.search = function() {
       
        $location.url('/search');
        
    };



  
});
	