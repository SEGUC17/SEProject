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
//admin login
var app = this;
var data = {
"username": "Admin" ,
"password":"Admin"

};
$scope.token ="";

Admin_login(data);
  function Admin_login(data){

    console.log("admin data ::"+data);

    	indexSrv.AdminLogin(data).then(function(response){

        console.log(response.data)
  			console.log("the token is: "+response.data.token)

        $scope.token =response.data.token;
  			if(response.data.type=='SUCCESS'){
  			 //$location.path('/admin')
  			   app.islogged = true;

           console.log(app.islogged );
  			}
  			else{
  			 app.islogged = false;

         console.log(app.islogged );
  			}

        adminSrv.declineSrvProvider('bazo11@gmail.com',$scope.token).success(function(msg) {

               $scope.msg = msg;

               console.log("deh bn3lha test ");
               console.log(msg);
               console.log("ctrl2_declineSrvProvider");
               console.log(Email);

               displaySrvProviders  ();
           });
  		})
  }

//  $scope.Email  = adminSrv.getEmail();
//removeSrvProvider($scope.Email);
//getServiceProvider();

//start viewDetais_SrvProvider ;button Detais


// end viewDetais_SrvProvider ;button Detais


//start deleteSrvProvider ;button delete


// end deleteSrvProvider ;button delete

$scope.SrvProviders=
    adminSrv.getVerifiedServiceProvider().success(function(Sp) {

           adminSrv.setSP(Sp);
           //removeSrvProviderconsole.log(Sp[0]);
            $scope.SrvProviders  = Sp;
            //console.log($scope.SrvProviders[0]);

});
//decline sp
$scope.declineSrvProvider  =function(Email ){
      console.log("ctrl_declineSrvProvider");
      console.log(Email);
    adminSrv.declineSrvProvider('aabazo1gt1@gmail.com',$scope.token).success(function(msg) {

           $scope.msg = msg;
           console.log("deh bn3lha test ");
           console.log(msg);
           console.log("ctrl2_declineSrvProvider");
           console.log(Email);

           displaySrvProviders  ();
       });
};
//delete sp
$scope.deleteSrvProvider  =function(Email){
      console.log("ctrl_deleteSrvProvider");
      console.log(Email);
    adminSrv.deleteSrvProvider(Email).success(function(msg) {

           $scope.msg = msg;
           console.log(msg);
           console.log("ctrl2_deleteSrvProvider");
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
