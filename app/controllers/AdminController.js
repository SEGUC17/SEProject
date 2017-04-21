angular.module('AdminController',['adminSrv'])
.controller('AdminController',function($scope,$http,adminSrv,$location) {

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

    $scope.DeleteServiceProvider  =function(Email){
          console.log("ctrl");
          console.log(Email);
        adminSrv.DeleteServiceProvider(Email).success(function(msg) {
               $scope.msg = msg;
               console.log(msg);
               console.log("ctrl2");
               console.log(Email);
               displaySrvProviders  ();
           });
};
$scope.declineSP =function(res){
    adminSrv.declineSP(res).success(function(msg) {
           $scope.msg = msg;
           displaySrvProviders  ();
       });
// this.Decline = function(){
//   console.log("testing new button");
//   $http.post('/server/adminhomepage/declineSP').then(function(res)){
//     console.log(res);
//     $scope.declineSP=res.data;
//   };

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
$scope.getNotifications =adminSrv.getNotifications().success((function(res)){
  adminSrv.setSP(res);
    $scope.Notifications=res.data;

});
// this.Notifications = function(){
//   console.log("testing new button");
//   $http.post('/server/adminhomepage/getNotifications').then(function(res)){
//     console.log(res);
//     $scope.getNotifications=res.data;
//   };

});
// adminSrv.getNotifications().then(function(res){
//   console.log(res);
//   $scope.getNotifications=res.data ;
// });
// $scope.getNotifications  =
//       // console.log("ctrluser");
//       // console.log(username);
//     adminSrv.getNotifications().success(function(ServiceProvider.listOfNotification) {
//
//            $scope.listOfNotification = listOfNotification;
//           // console.log(SProvider);
//            console.log("List of Notifications");
//            displaySrvProviders  ();
//         //   console.log(unRegisterSP);
//       });

// $scope.declineSP  =
//               // console.log("ctrluser");
//               // console.log(username);
//             adminSrv.declineSP().success(function(ServiceProvider.listOfNotification) {
//
//                    $scope.listOfNotification = listOfNotification;
//                   // console.log(SProvider);
//                    console.log("List of Notifications");
//                 //   console.log(unRegisterSP);
// displayUnRegSrvProviders  ();
