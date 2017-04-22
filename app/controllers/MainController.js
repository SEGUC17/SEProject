angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {
//console.log('main')

// indexSrv.getVerifiedServiceProvider().then(function(res){
// 	$scope.title=res.data
// })
indexSrv.getCatalog().then(function(res){
  $scope.catalog=res.data;
})

$scope.studentcourses=[];
indexSrv.getStudentProfile().then(function(res){
  $scope.username=res.data[0];
  $scope.profilepicture=res.data[1];
  
  var i=2;
  var j=0;
  while(i<res.data.length){
$scope.studentcourses[j]=res.data[i];
i++;
j++;
  }
})

var app = this;

app.redirectCourse=function(course){


   console.log("hiiiiiiiii coursee")
   
   	console.log(course);
    var set=course;
    console.log("settt");
    indexSrv.set(set);
  
   
   console.log("afterrr")

 $location.path('/studentprofile/review')

}
//console.log("gettttt")
$scope.getting=indexSrv.get();

			$rootScope.$on('$routeChangeStart',function(){



			if(indexSrv.IsLoggedIn()){
			console.log("success user is logged in")
			indexSrv.GetCurrentUser().then(function(data){
			console.log(data.data)
			 $scope.SPusername=data.data.decoded.username
			  app.islogged = true;

			         });
			      }
			         else
			          {
			  console.log("user is not logged")
			  	$scope.SPusername='';
              app.islogged = false;


			    }




})


	this.login=function(data){
		indexSrv.ServiceProviderLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){
			$location.path('/spPortofolio')
			app.islogged = true;


			}
			else{
			 app.islogged = false;

			}


		})
	}
this.addReview=function(data){

	console.log("hellooooo")
	console.log(data)
 //data['courseTitle']=indexSrv.get();
	// data.courseTitle=indexSrv.get();
	//console.log( data['courseTitle']);
	// console.log(data);
	indexSrv.postReview(app.data).then(function(res){
     console.log("my resss")
     console.log(res)
   $scope.listofreviews=res.data;

   })}

//student login
this.Student_login=function(data){
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){
			$location.path('/welcome')
			app.islogged = true;


			}
			else{
			 app.islogged = false;

			}


		})
	}




	this.logout=function(){
		indexSrv.LogOut();
		console.log("log")
	    $location.path('/')


	}




  //
  // indexSrv.getCatalogPage();
//$location.url('/welcome');
// $scope.search = function() {
       
//         $location.url('/search');
        
//     };


// indexSrv.spRegister($scope.sp).then(function)(res){
//         $location.url('/register');

// }



});
