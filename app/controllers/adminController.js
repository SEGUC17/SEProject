angular.module('adminController',['adminServ'])
.controller('adminController',function($scope,$http,$location,adminServ){


  this.newStudent = function(data){

		  stServ.studentRegister(this.data)
		  		
	}

	this.payement = function(data){
		stServ.studentPayment(this.data);
	}

});
