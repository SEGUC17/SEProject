myApp.controller('MainController', function($scope,indexSrv,$location) {

$scope.title=  '' ;

$location.url('/adminPage');

//$scope.count = 0;
$scope.IsVisible = false;
$scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
    $scope.IsVisible = $scope.IsVisible ? false : true;
    // if($scope.IsVisible===false){
    //   $scope.IsVisible=true;
    //   return "here 1";
    // }else if ($scope.IsVisible=== true) {
    //   $scope.IsVisible=false;
    //   return "here 2";
    // }

};
//getServiceProvider();
    function getServiceProvider(){

    indexSrv.getAllVerifiedServiceProvider().success(function(Sp) {

       indexSrv.setSP(Sp);
       $scope.title  =indexSrv.getSP(Sp);
       });
     };


});
