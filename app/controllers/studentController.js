
angular.module('studentController',['studentServ'])

.controller('studentController',function($scope,$http,$location,studentServ){

console.log("student controllerrrrr");

 $scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }

  this.newStudent = function(data){

		//console.log("consoling from controller",this.data);
		  studentServ.studentRegister(this.data).then(function(response){
		  	//console.log("consoling the response")
			//console.log(response)
			//$location.path('/register')
		})
	}

});