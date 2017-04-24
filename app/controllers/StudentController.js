angular.module('StudentController',['stServ'])
.controller('StudentController',function($scope,$http,$location,stServ){

<<<<<<< HEAD
 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }
this.typeReview=(data)=>{
	stServ.typeReview(this.data).then(function(argument) {
		console.log(argument.data.content);
	});
=======
>>>>>>> master

}
  this.newStudent = function(data){

		  stServ.studentRegister(this.data)

		  			
	}

	$scope.course=indexSrv.get();
console.log("henaa title");
 
this.payement = function(){
		stServ.studentPayment().then(function(response){
			console.log(response);
		});
 
	}

});
