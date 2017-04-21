angular.module('spctr',['businessServ','courseServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$scope,$location,businessServ,indexSrv,courseServ){

var app =this;
		// indexSrv.GetCurrentUser().then(function(data){
		// 	 app.SPtoken=data.data.token
  //   });

		$scope.likes=0;
       $scope.dislikes=0;
	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)

			//$location.path('/register')
		})
	}
this.viewannouncements = function(data){
courseServ.viewannouncements(app.data).then(function(res){

	console.log(res.data.content)
	$location.path('/viewannouncements');
	$scope.gina=res.data.content
	
})
}
this.removeCourse = function(data){
courseServ.removeCourse(app.data).then(function(res){
  console.log("remove courseeeeeeee")
	console.log(res)
	$location.path('/removeCourse');

	
})
}
this.viewreviews = function(data){
courseServ.viewreviews(app.data).then(function(res){
	console.log(res.data.content)
	$location.path('/viewreviews');
	$scope.heba=res.data.content
})
}
	this.addCourse =function(data){

		// data["token"]=app.SPtoken;
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			console.log(app.data)


		})
	}


	this.postannouncement =function(data){
$location.path('/postannouncement');
		// data["token"]=app.SPtoken;
		courseServ.postannouncement(app.data).then(function(response){
			console.log(response)
			console.log(app.data)
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})
	}
	this.updatecourse =function(data){
    $location.path('/updatecourse');
		// data["token"]=app.SPtoken;
		courseServ.updatecourse(app.data).then(function(response){
			
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})
	}
	$scope.plusOne=function(){
      $scope.likes +=1;
      courseServ.updatecourse(app.data).then(function(response){
			
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})

	}
	$scope.minusOne=function(){
      $scope.dislikes +=1;
      courseServ.updatecourse(app.data).then(function(response){
			
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


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

