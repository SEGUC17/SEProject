

myApp.controller('MainController', function($scope,indexSrv,$location) {

  $location.url('/welcome');
  // /$scope.title ="" ;

  //   $scope.title = function(){
  // indexSrv.getVerifiedServiceProvider();
  // } ;
 
  // console.log(  $scope.title) ;
  getServiceProvider();

  //$scope.title  =indexSrv.getServiceProviderInstant(); // dah 3`alt 
  console.log($scope.title);
  
  function getServiceProvider(){

 indexSrv.getUnverifiedServiceProvider().success(function(Sp) {

 		
    indexSrv.setServiceProviderInstant(Sp);

console.log(Sp);
 $scope.title  =indexSrv.getServiceProviderInstant(); // sh sa7 3lshan  7ateto gwa l cb
// console.log("in ctrl");p
 	Sp.forEach(function(c) {




 		});

 });

  };

$scope.search = function() {
       
        $location.url('/search');
        
    };

$scope.catalog = function() {
       
        $location.url('/catalog');
        
    };
$scope.login = function() {
       
        $location.url('/login');
        
    };
    $scope.Signup = function() {
       
        $location.url('/Popup');
        
    };
  
});
	