angular.module('StudentController',['stServ','indexSrv'])
.controller('StudentController',function($scope,$http,$location,stServ,indexSrv){
//console.log("student controllerrrrr");

 //$scope.student="youmna";

//  $scope.signUp=function(){

// 	     $location.url('/signUp');
// }
var app =this;

  console.log("hi")
    $scope.coursez = indexSrv.get()
    var test ={};
    var y=$scope.coursez;
  var xx= {title:y.title}
  console.log(xx)

		
    


    $scope.coursez = indexSrv.get()


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
	
	this.viewreviews = function(data){
	stServ.viewreviews(this.data).then(function(res){
		console.log(res);
		if(res.data.content=='No reviews found !'){
			$location.path('/home1');
		}else{
	$scope.yasso=res.data.content
}
})
}

});
