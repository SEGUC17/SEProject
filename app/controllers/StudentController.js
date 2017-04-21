angular.module('StudentController',['stServ'])
.controller('StudentController',function($scope,$http,$location,stServ){
//console.log("student controllerrrrr");

 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }
this.typeReview=(data)=>{
	stServ.typeReview(this.data).then(function(argument) {
		console.log(argument.data.content);
	});

}
  this.newStudent = function(data){

		  stServ.studentRegister(this.data)
		  	
		
	}

});
