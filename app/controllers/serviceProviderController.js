angular.module('spctr',['businessServ','indexSrv','courseServ','adminSrv'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope){

var app =this;
		// indexSrv.GetCurrentUser().then(function(data){
		// 	 app.SPtoken=data.data.token
  //   });
$scope.oneCourse={};
$scope.errorAddCourse=false;
$scope.holdErrorAddCourseSuccess=true;
$scope.errorAddCoursemessage="";		
$scope.coursez = indexSrv.get();
var test ={};
var y=$scope.coursez;
var xx= {title:y.title}

//Feh @l addCourse he can go back to his portofilio
$scope.goBackProtofolio = function(){
	$location.path("/spPortofolio");
}

//updated
$scope.removeCourse = function(){
	var xy = {
		"title":$scope.coursez.title
	};
courseServ.removeCourse(xy).then(function(res){
 	$location.path('/oneCourse');
	
})
}
	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)

			//$location.path('/register')
		})
	}

//updated
	this.addCourse =function(data){

		// data["token"]=app.SPtoken;
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			var flag=response.data;
			var f=flag.type;
			var m=flag.message;
			if(f=="ERROR"){
			$scope.errorAddCourse=true;
			$scope.errorAddCoursemessage=m;
		}
		else
			{
				$scope.holdErrorAddCourseSuccess=false;
				$scope.errorAddCoursemessage=m;
			}
			//$location.path('/home');


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

