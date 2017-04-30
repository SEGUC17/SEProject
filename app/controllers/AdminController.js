angular.module('AdminController', ['adminSrv']).controller('AdminController',function($scope,adminSrv,indexSrv,$location,businessServ) {
 //adminSrv.setEmail("balabizo@gmail.com");
$scope.msg = "";
$scope.unRegisterSP = "";

$scope.IsVisible = false;
$scope.ShowHide = function () {
    //If DIV is visible it will be hidden and vice versa.
     $scope.IsVisible = $scope.IsVisible ? false : true;


};
console.log("indexSRV ==");
console.log(indexSrv);


$scope.GoToSPpage=  function(Email){

adminSrv.getSpDetail(Email,indexSrv.GetToken()).success(function(spProfile) {
// eh deh ??  deh btgebb l data bta3t  l sp

adminSrv.setSpProfile(spProfile.content); 
console.log("ana hna sp profile "+spProfile);
console.log(spProfile.content);
$location.path("/viewP");

});

};

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
//
// function displaySPNotifications($q) {
//
//    adminSrv.getNotifications(indexSrv.GetToken()).success(function(Sp) {
//  // console.log('notifications')
//  // console.log(res)
//  var spvalues = $q.resolve([
//    { username: 11, organizationName: 'Mr. Nice' },
//  ]);
//  //$scope.notifications=res;
//
//   this.getNotifications = function() {
//     return spvalues;
//   };
//
//   this.getNotifications = function(sp) {
//     return spvalues.then(function(ServiceProvider) {
//       for (var i = 0; i < ServiceProvider.length; i++) {
//         if (ServiceProvider[i].username === username) return ServiceProvider[i];
//       }
//     });
//   };
// }
// }
// adminSrv.getNotifications().success(function(data) {
//               console.log(res.data);
//                 $scope.getNotifications =data;
//                 console.log(data);
//  });
// });
          //    adminSrv.getNotifications().success(function(data){
          //
          //     // console.log("====================================")
          //     console.log('notifications')
          //     console.log(data)
          //     $scope.getNotifications=data;
          // });

          $scope.Notifications=  function(){
          adminSrv.getNotifications().then(function(data) {
             console.log(data);
             $scope.Notifications=data;
          });
        };
        //  $scope.adminPage=adminSrv.getNotifications().success(function(data) {
        //     console.log(data);
        //  });


// });
//$scope.notifications=res;


// this.Notifications = function(){
//   console.log("testing new button");
//   $http.post('/serviceprovider/getNotifications').then(function(data){
//     console.log(res);
//     $scope.getNotifications=data;
//   });
// };
});
// navigator.serviceWorker.register('sw.js');

// function showNotification() {
//         $scope.showNotification(res, {
//           icon: 'ServiceProvider.logo',
//           data: 'ServiceProvider.organizationName',
//           data: 'ServiceProvider.username',
//           body: 'ServiceProvider.listOfNotification',
//         });
//       };
