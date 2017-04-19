angular.module('spctr',['businessServ','courseServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,$scope,businessServ,courseServ){

	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)
			//$location.path('/register')
		})
	}



	this.login=function(data){
		businessServ.ServiceProviderLogin(this.data).then(function(response){
			console.log(response.data)
			console.log("the token is: "+response.data.token)

			if(response.data.success==true)
			$location.path('/')

		})
	}

	courseServ.ViewReviews().then(function(res){
	$scope.title=res.data
})

})

