myApp.controller('AdminController',function($scope,adminSrv,$location) {
 //adminSrv.setEmail("balabizo@gmail.com");
$scope.msg = "";
$scope.test = "testemail";
$scope.unRegisterSP = "";
// $scope.SrvProviders   ="";
//$scope.count = 0;

$scope.IsVisible = false;
$scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
     $scope.IsVisible = $scope.IsVisible ? false : true;

};

//  $scope.Email  = adminSrv.getEmail();
//removeSrvProvider($scope.Email);
//getServiceProvider();
$scope.SrvProviders=
    adminSrv.getVerifiedServiceProvider().success(function(Sp) {

           adminSrv.setSP(Sp);
           //removeSrvProviderconsole.log(Sp[0]);
            $scope.SrvProviders  = Sp;
            //console.log($scope.SrvProviders[0]);

});

$scope.declineSrvProvider  =function(Email){
      // console.log("ctrl");
      // console.log(Email);
    adminSrv.declineSrvProvider(Email).success(function(msg) {

           $scope.msg = msg;
           console.log(msg);
           console.log("ctrl_declineSrvProvider");
           console.log(Email);

           displaySrvProviders  ();
       });
};

//deleteSP
$scope.deleteSrvProvider  =function(organizationName){
    adminSrv.deleteSrvProvider(organizationName).success(function(msg) {

           $scope.msg = msg;
           console.log(msg);
           console.log("ctrl_deleteSrvProvider");
           console.log(organizationName);

           displaySrvProviders  ();
       });
};

function  displaySrvProviders  (){
    $scope.SrvProviders   ="";
    $scope.SrvProviders   = adminSrv.getVerifiedServiceProvider().success(function(Sp) {

          adminSrv.setSP(Sp);
          //removeSrvProviderconsole.log(Sp[0]);
           $scope.SrvProviders  = Sp;
           //console.log($scope.SrvProviders[0]);

        });
};

// $scope.removeUnRegSrvProvider  =function(Email){
//       console.log("ctrl");
//       console.log(Email);
//     adminSrv.removeUnRegSrvProvider(Email).success(function(msg) {
//
//            $scope.msg = msg;
//            console.log(msg);
//            console.log("ctrl2");
//            console.log(Email);
//
//            displayUnRegSrvProviders ();
//        });
// };

$scope.viewUnSrvProvider  = function(){
      // console.log("ctrluser");
      // console.log(username);
    adminSrv.viewUnSrvProvider().success(function(SProvider) {

           $scope.unRegisterSP = SProvider;
          // console.log(SProvider);
           console.log("ctrl_viewUnSrvProvider");
        //   console.log(unRegisterSP);
        displayUnRegSrvProviders  ();
      });
};

function  displayUnRegSrvProviders  (){
  $scope.unRegisterSP = "";
  $scope.viewUnSrvProvider  =function(){
        // console.log("ctrluser");
        // console.log(username);
      adminSrv.viewUnSrvProvider().success(function(SProvider) {

             $scope.unRegisterSP = SProvider;
             console.log(unRegisterSP);
             console.log("ctrlunreguser");
          //   console.log(unRegisterSP);

         });
  };
};



});
