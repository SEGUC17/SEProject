angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {



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

 //$location.path('/studentprofile/review')

}
//console.log("gettttt")
$scope.getting=indexSrv.get();




})
