angular.module('AdminController', ['adminSrv']).controller('AdminController',function($scope,adminSrv,indexSrv,$location) {
 //adminSrv.setEmail("balabizo@gmail.com");
$scope.msg = "";
// $scope.test = "testemail";
$scope.unRegisterSP = "";
// $scope.SrvProviders   ="";
//$scope.count = 0;

$scope.IsVisible = false;
$scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
     $scope.IsVisible = $scope.IsVisible ? false : true;

};
console.log("indexSRV ==");
console.log(indexSrv);

//admin login
// $scope.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI1OGY5MGQzNGM4YjQ3NmI3MzA0NTFlMjMiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE0OTI3MzA5OTJ9.yTax2Au9-7VDajfe0HmjKSp3Y0nm2yWN-r9ttbDtpL8";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI1OGZhNTk3ZGYzNjI2ODE0OGExYTA2NzIiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE0OTI4MDE5NDJ9.fU89UnB4qcck_iN-26yff_UENFvg3zlAlT1JbgEEBgk
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiaWQiOiI1OGZhNTk3ZGYzNjI2ODE0OGExYTA2NzIiLCJ0eXBlIjoiQWRtaW4iLCJpYXQiOjE0OTI4MDE5NDJ9.fU89UnB4qcck_iN-26yff_UENFvg3zlAlT1JbgEEBgk"



//  $scope.Email  = adminSrv.getEmail();
//removeSrvProvider($scope.Email);
//getServiceProvider();
// console.log(indexSrv.GetToken());
$scope.SrvProviders=
    adminSrv.getVerifiedServiceProvider(indexSrv.GetToken()).success(function(Sp) {

           adminSrv.setSP(Sp);
           //removeSrvProviderconsole.log(Sp[0]);
            $scope.SrvProviders  = Sp;
            console.log(Sp);

});
//decline sp by the email
$scope.declineSrvProvider  =function(Email ){
      // console.log("ctrl_declineSrvProvider");
      // console.log(Email);
    adminSrv.declineSrvProvider(Email,indexSrv.GetToken()).success(function(msg) {

           $scope.msg = msg;
           console.log("declineSrvProvider :: deh bn3lha test ");
           console.log(msg);
           console.log("ctrl2_declineSrvProvider");
           console.log(Email);

           displaySrvProviders  ();
           displayUnRegSrvProviders();
       });
};


// VerifySrvProvider(UNsps.email)
$scope.VerifySrvProvider  =function(username,password,email){

      console.log("ctrl_VerifySrvProvider");
      // console.log(this.data);
      // console.log(data.decoded.username);
      console.log(username);
      console.log(password);

    adminSrv.VerifySrvProvider(username,password,email,indexSrv.GetToken()).success(function(Verifymsg) {

           $scope.msg = Verifymsg;
           console.log("VerifySrvProvider :: deh bn3lha test ");
           console.log(Verifymsg);
           console.log("ctrl2_VerifySrvProvider");
          //  console.log(Verifymsg.username);
          //  console.log(Verifymsg.password);
          displayUnRegSrvProviders();

           displaySrvProviders  ();
       });
};


// //delete sp
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



// this method to redirect to the clicked service provider
// function GoToSPpage(sps){
//
//
//
//
//
// };

$scope.viewUnSrvProvider  =
      // console.log("ctrluser");
      // console.log(username);
    adminSrv.viewUnSrvProvider(indexSrv.GetToken()).success(function(SProvider) {

           $scope.unRegisterSP = SProvider;
           console.log(SProvider);
           console.log("ctrluser!!");
        //  console.log(unRegisterSP);

});


function  displaySrvProviders  (){
    $scope.SrvProviders   ="";
     adminSrv.getVerifiedServiceProvider(indexSrv.GetToken()).success(function(Sp) {

          adminSrv.setSP(Sp);
          //removeSrvProviderconsole.log(Sp[0]);
          $scope.SrvProviders  = Sp;
          //console.log($scope.SrvProviders[0]);

        });
};


function  displayUnRegSrvProviders  (){
  $scope.unRegisterSP = "";
        // console.log("ctrluser");
        // console.log(username);
        adminSrv.viewUnSrvProvider(indexSrv.GetToken()).success(function(SProvider) {

               $scope.unRegisterSP = SProvider;
               console.log(SProvider);
               console.log("ctrluser!!");
            //  console.log(unRegisterSP);
    });


};



});
