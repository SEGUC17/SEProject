angular.module('spctr',['businessServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope){

var app =this;
		// indexSrv.GetCurrentUser().then(function(data){
		// 	 app.SPtoken=data.data.token
  //   });

		

	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)

			//$location.path('/register')
		})
	}

	this.addCourse =function(data){

		// data["token"]=app.SPtoken;
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			console.log(app.data)


		})
	}


   
	this.OneCourse =function(data){

            
	        businessServ.viewOneCourse(app.data).then(function(response){
			console.log(response)
			$scope.oneCourse= response.data.content
			//$location.path('/singleCourse')
		        	//$scope.c="hi"
                   //console.log(app.data)


		})
	}


		businessServ.ServiceProviderViewCourse().then(function(response){
			console.log(response)
			console.log(response.data.content)

			$scope.courses=response.data.content
	


		})

		this.okay=function(data){

			businessServ.ServiceProviderViewCourse().then(function(response){
		

			$scope.myCourses=response.data.content
		    $location.path('/singleCourse')


		})
			
			
		}



		businessServ.ServiceProviderViewPortofolio().then(function(response){
			console.log(response)
			console.log(response.data)

			$scope.profile=response.data.content
	


		})



		this.update = function(data){
			businessServ.updatePortofolio(app.data).then(function(response){
				console.log(response.data);
				//$scope.newPortofolio = response.data.content;
			})
		}


	// if(businessServ.IsLoggedIn()){
	// 	console.log("user logged in")
	// }else
	// {
	// console.log("user not  logged in")

	// }

	// this.login=function(data){
	// 	businessServ.ServiceProviderLogin(this.data).then(function(response){
	// 		// console.log(response.data)
	// 		// console.log("the token is: "+response.data.token)

	// 		if(response.data.success==true)
	// 		$location.path('/')

	// 	})
	// }



})

