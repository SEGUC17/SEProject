<<<<<<< HEAD
angular.module('AdminController', ['adminSrv'])
.controller('AdminController',function($scope,adminSrv,indexSrv,$location) {
=======
angular.module('AdminController', ['adminSrv']).controller('AdminController',function($scope,adminSrv,indexSrv,$location) {
>>>>>>> parent of 8812240... modify
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
//admin login
$scope.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI1OGY5MGQzNGM4YjQ3NmI3MzA0NTFlMjMiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE0OTI3MzA5OTJ9.yTax2Au9-7VDajfe0HmjKSp3Y0nm2yWN-r9ttbDtpL8";
<<<<<<< HEAD
=======

>>>>>>> parent of 8812240... modify

//  $scope.Email  = adminSrv.getEmail();
//removeSrvProvider($scope.Email);
//getServiceProvider();

//start viewDetais_SrvProvider ;button Detais


// end viewDetais_SrvProvider ;button Detais


//start deleteSrvProvider ;button delete


// end deleteSrvProvider ;button delete

$scope.SrvProviders=
    adminSrv.getVerifiedServiceProvider($scope.token).success(function(Sp) {

           adminSrv.setSP(Sp);
           //removeSrvProviderconsole.log(Sp[0]);
            $scope.SrvProviders  = Sp;
            console.log(Sp);

});
//decline sp
$scope.declineSrvProvider  =function(Email){
      console.log("ctrl_declineSrvProvider");
      console.log(Email);
    adminSrv.declineSrvProvider(Email,$scope.token).success(function(msg) {

           $scope.msg = msg;
           console.log("deh bn3lha test ");
           console.log(msg);
           console.log("ctrl2_declineSrvProvider");
           console.log(Email);

           displaySrvProviders  ();
           displayUnRegSrvProviders();
       });
};
<<<<<<< HEAD
//delete sp
=======
// //delete sp
>>>>>>> parent of 8812240... modify
// $scope.deleteSrvProvider  =function(Email){
//       console.log("ctrl_deleteSrvProvider");
//       console.log(Email);
//     adminSrv.deleteSrvProvider(Email).success(function(msg) {
//
//            $scope.msg = msg;
//            console.log(msg);
//            console.log("ctrl2_deleteSrvProvider");
//            console.log(Email);
//
//            displaySrvProviders  ();
//        });
// };

<<<<<<< HEAD
//VerifySrvProvider(UNsps.email)
=======
>>>>>>> parent of 8812240... modify

$scope.viewUnSrvProvider  =
      // console.log("ctrluser");
      // console.log(username);
    adminSrv.viewUnSrvProvider($scope.token).success(function(SProvider) {

           $scope.unRegisterSP = SProvider;
<<<<<<< HEAD
           console.log(SProvider);
           console.log("ctrluser!!");
        //   console.log(unRegisterSP);
=======
         console.log(SProvider);
           console.log("ctrluser!!");
        //  console.log(unRegisterSP);
>>>>>>> parent of 8812240... modify

});


function  displaySrvProviders  (){
    $scope.SrvProviders   ="";
    $scope.SrvProviders   = adminSrv.getVerifiedServiceProvider($scope.token).success(function(Sp) {

          adminSrv.setSP(Sp);
          //removeSrvProviderconsole.log(Sp[0]);
           $scope.SrvProviders  = Sp;
           //console.log($scope.SrvProviders[0]);

        });
};


function  displayUnRegSrvProviders  (){
  $scope.unRegisterSP = "";
<<<<<<< HEAD

        // console.log("ctrluser");
        // console.log(username);
      adminSrv.viewUnSrvProvider($scope.token).success(function(SProvider) {
=======
        // console.log("ctrluser");
        // console.log(username);
        adminSrv.viewUnSrvProvider($scope.token).success(function(SProvider) {

               $scope.unRegisterSP = SProvider;
             console.log(SProvider);
               console.log("ctrluser!!");
            //  console.log(unRegisterSP);
>>>>>>> parent of 8812240... modify

    });

<<<<<<< HEAD
         });

=======
>>>>>>> parent of 8812240... modify
};



});
