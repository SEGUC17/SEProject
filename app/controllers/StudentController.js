angular.module('StudentController',['stServ'])
.controller('StudentController',function($scope,$http,$location,stServ){


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
