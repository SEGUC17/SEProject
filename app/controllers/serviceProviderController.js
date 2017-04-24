
angular.module('spctr',['businessServ','indexSrv','courseServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope,courseServ){

var app =this;

  console.log("hi")
    $scope.coursez = indexSrv.get()
    var test ={};
    var y=$scope.coursez;
  var xx= {title:y.title}
  console.log(xx)

		indexSrv.GetCurrentUser().then(function(data){
		$scope.type=data.data.decoded.type
		
		if($scope.type=='ServiceProvider')
			app.isSP=true;
		else
	       app.isSP=false;


    });


    $scope.coursez = indexSrv.get()


  

this.viewannouncements = function(){
	
  

courseServ.viewannouncements(xx).then(function(res){
	console.log(res.data.content)
	$location.path('/viewannouncements');
	$scope.gina=res.data.content
	
})
}
this.viewannouncements1 = function(){
	
  

courseServ.viewannouncements(xx).then(function(res){
	console.log(res.data.content)
	$location.path('/viewannouncements1');
	$scope.gina1=res.data.content
	
})
}
this.removeAnnouncements = function(data){
	// data.courseTitle=$scope.gina;
	
	var xxx=indexSrv.get()
	console.log(xxx)
	
	console.log(data)
	var yyy=data;

   indexSrv.combine(xxx,yyy);

   var send=indexSrv.get();
	
indexSrv.removeAnnouncements(send).then(function(res){
  console.log("removeAnnouncements")
	console.log(res)
	// $location.path('/removeAnnouncements');

	
})
}


this.removeCourse = function(data){
courseServ.removeCourse(app.data).then(function(res){
  console.log("remove courseeeeeeee")
	console.log(res)
	$location.path('/removeCourse');

	
})
}

this.viewreviews = function(data){
courseServ.viewreviews(app.data).then(function(res){
	console.log(app.data)

	console.log(res)
	//$location.path('/viewreviews');
	$scope.heba=res.data.content
})
}

this.postannouncement =function(){
$location.path('/postannouncement');
test["title"]=y.title;
test["announcements"]=app.data.announcements
		// data["token"]=app.SPtoken;
		courseServ.postannouncement(test).then(function(response){

			console.log(response)
			console.log(app.data)
			
			// console.log(test)

			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})
	}

	this.updatecourse =function(data){
    //$location.path('/updatecourse');
		// data["token"]=app.SPtoken;
		courseServ.updatecourse(app.data).then(function(res){
			console.log(app.data)
			console.log(res)
			
			if(res.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})
	}




	$scope.plusOne=function(){
      $scope.likes +=1;
      courseServ.updatecourse(app.data).then(function(response){
			
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})

	}
	$scope.minusOne=function(){
      $scope.dislikes +=1;
      courseServ.updatecourse(app.data).then(function(response){
			
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})

	}

		



	this.addCourse =function(data){

		// data["token"]=app.SPtoken;
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			console.log(app.data)


		})
	}


// var heba="heba";
//    $scope.coursez=indexSrv.set(heba)
	this.OneCourse =function(data){

            
	        businessServ.viewOneCourse(app.data).then(function(response){
			console.log(response)
			$scope.oneCourse= response.data.content
			var c =$scope.oneCourse
			indexSrv.set(c);

			//$location.path('/singleCourse')
		        	//$scope.c="hi"
                   //console.log(app.data)


		})
	}
	//////////////////////////////////////
	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)

			//$location.path('/register')
		})
	}
	////////////////////////////////////
	this.update = function(data){
			businessServ.updatePortofolio(app.data).then(function(response){
				console.log(response.data);
				//$scope.newPortofolio = response.data.content;
			})
		}

 
   // console.log( $scope.coursez)


	

		businessServ.ServiceProviderViewCourse().then(function(response){
			// console.log(response)
			// console.log(response.data.content)
			console.log("courses are:")
		     console.log(response)
			$scope.courses=response.data.content
		
	


		});



		businessServ.ServiceProviderViewPortofolio().then(function(response){
			//console.log(response)
			console.log(response.data)

			$scope.profile=response.data.content
	


		})


})


angular.module('AdminController', ['adminSrv','indexSrv']).controller('AdminController',function($scope,adminSrv,indexSrv,$location) {
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



// $scope.getNotifications =adminSrv.getNotifications().success((function(res)){
//   adminSrv.setSP(res);
//     $scope.Notifications=res.data;

// });




 adminSrv.getNotifications().then(function(res){

  // console.log("====================================")
  console.log('notifications')
  console.log(res)
  $scope.notifications=res;
})
   
  

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

