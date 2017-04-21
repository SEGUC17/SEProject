angular.module('StudentController',['stServ'])
.controller('StudentController',function($scope,$http,$location,stServ){
//console.log("student controllerrrrr");

 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }

  this.newStudent = function(data){

		  stServ.studentRegister(this.data)
		  	
		
	}

});
