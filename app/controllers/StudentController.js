angular.module('StudentController',['stServ'])
.controller('StudentController',function($scope,$http,$location,stServ){
//console.log("student controllerrrrr");

 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }
<<<<<<< HEAD

=======
this.typeReview=(data)=>{
	stServ.typeReview(this.data).then(function(argument) {
		console.log(argument.data.content);
	});

}
>>>>>>> f0094daf23b98f0f2f216e3bf40e2383051888c0
  this.newStudent = function(data){

		  stServ.studentRegister(this.data)
		  	
		
	}

});
