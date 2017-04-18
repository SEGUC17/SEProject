myApp.controller('AdminController', function($scope,adminSrv,indexSrv,$location) {

 //adminSrv.setEmail("balabizo@gmail.com");
 $scope.msg = "";
  $scope.test = "testemail";
//$scope.count = 0;

$scope.IsVisible = false;
$scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
     $scope.IsVisible = $scope.IsVisible ? false : true;

};

//  $scope.Email  = adminSrv.getEmail();
//removeSrvProvider($scope.Email);

$scope.SrvProviders = indexSrv.getAllVerifiedServiceProvider().success(function(Sp) {

           indexSrv.setSP(Sp);

           //removeSrvProviderconsole.log(Sp[0]);
            $scope.SrvProviders  = Sp;
            //console.log($scope.SrvProviders[0]);

});


$scope.removeSrvProvider  =function(Email){
      console.log("ctrl");
      console.log(Email);
    adminSrv.removeSrvProvider(Email).success(function(msg) {

           $scope.msg = msg;
           console.log(msg);
           console.log("ctrl2");
           console.log(Email);

           displaySrvProviders  ();
       });
};

function  displaySrvProviders  (){
    $scope.SrvProviders   ="";
    $scope.SrvProviders   = indexSrv.getAllVerifiedServiceProvider().success(function(Sp) {

          indexSrv.setSP(Sp);

          //removeSrvProviderconsole.log(Sp[0]);
           $scope.SrvProviders  = Sp;
           //console.log($scope.SrvProviders[0]);

        });
      };

});
