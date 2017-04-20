<<<<<<< HEAD
angular.module('AdminController', []).config(function() {

.controller('AdminController', function($scope,adminSrv,indexSrv,$location) {

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
=======
myApp.controller('AdminController',function($scope,adminSrv,indexSrv,$location) {
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

$scope.viewUnSrvProvider  =
      // console.log("ctrluser");
      // console.log(username);
    adminSrv.viewUnSrvProvider().success(function(SProvider) {

           $scope.unRegisterSP = SProvider;
          // console.log(SProvider);
           console.log("ctrluser");
        //   console.log(unRegisterSP);

});


function  displaySrvProviders  (){
    $scope.SrvProviders   ="";
    $scope.SrvProviders   = adminSrv.getVerifiedServiceProvider().success(function(Sp) {

          adminSrv.setSP(Sp);
          //removeSrvProviderconsole.log(Sp[0]);
           $scope.SrvProviders  = Sp;
           //console.log($scope.SrvProviders[0]);

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
>>>>>>> adminPage
