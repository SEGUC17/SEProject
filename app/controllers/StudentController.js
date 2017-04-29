angular.module('StudentController',['stServ','indexSrv'])
.controller('StudentController',function($scope,$http,$location,stServ,indexSrv){
//console.log("student controllerrrrr");
var app=this;
 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }

  this.newStudent = function(data){
  
     // console.log("email to be submitted in the form")
     // console.log(this.data.email);   

	  stServ.studentRegister(app.data).then(function(response){
		  	// console.log('resoonseeeeeeeeee')
		  	var res=indexSrv.get();
		  	$scope.message="";
		  	$scope.message2="";
		  	if(res.data.message=="USERNAME ALREADY EXIST")
		  		$scope.message="Sorry this username is already taken, try another one !. "
            else if(res.data.message=="You are registered successfully !")
                  {
                  
                  	$scope.message2="Congratulations, You have successfully registered ! ."
                     indexSrv.StudentLogin(app.data); 
                     $location.url('/');
                
                 }
		  	
		});
		// console.log("xxxxxxxxxx");
		// console.log(x);
		  	
		
	}
	$scope.course=indexSrv.get();
console.log("henaa title");
 
this.payement = function(){
		stServ.studentPayment().then(function(response){
			console.log(response);
		});
 
	}

});
