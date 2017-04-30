angular.module('spctr',['businessServ','indexSrv','courseServ','adminSrv'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope,courseServ,adminSrv){

var app =this;
$scope.oneCourse={};
$scope.errorAddCourse=false;
$scope.holdErrorAddCourseSuccess=true;
$scope.errorAddCoursemessage="";

app.viewlisterrormessage=true;
app.holderrormessage=false;
app.messagesha="ya";
app.viewlistbutton=true;
app.ListOfEnrolledStudents=[];

app.ListOfReviews=[];
app.messagesViewReviews="ya";
app.holderrormessageViewreviews=true;



$scope.courseArray=['yasminy','3adi','tani','course','12','yasmin','toz'];
$scope.title='12rr';
$scope.testCourse={};
$scope.removeCourse={};

	// $scope.yasmin = true;
	// $scope.messagesha = "";


$scope.viewReviews=function(){
	var title=indexSrv.get();
	console.log(title);
	var courseTitle=
	businessServ.viewReviews()

}

this.viewannouncements = function(){
courseServ.viewannouncements(xx).then(function(res){
	console.log(res.data.content)
	$location.path('/viewannouncements');
	$scope.gina=res.data.content
	
})
}

this.viewannouncements1 = function(){
courseServ.viewannouncements(xx).then(function(res){
	console.log(res.data.content)
	$location.path('/viewannouncements1');
	$scope.gina1=res.data.content
	
})
}


this.removeAnnouncements = function(data){
	var xxx=indexSrv.get()
	console.log(xxx)
	console.log(data)
	var yyy=data;
   indexSrv.combine(xxx,yyy);
   var send=indexSrv.get();
indexSrv.removeAnnouncements(send).then(function(res){
  console.log("removeAnnouncements")
	console.log(res);
})
}


this.addCourse =function(data){

	var startDate=app.data.startDate.getTime();
	console.log(startDate);
	var endDate=app.data.endDate.getTime();
	if(startDate>endDate){
		$scope.errorAddCourse=true;
		$scope.errorAddCoursemessage="Please enter a vaild dates ";
	}else{
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			var flag=response.data;
			var f=flag.type;
			var m=flag.message;
			if(f=="ERROR"){
			$scope.errorAddCourse=true;
			$scope.errorAddCoursemessage=m;
			$scope.holdErrorAddCourseSuccess=true;
		}
		else
			{
				$scope.holdErrorAddCourseSuccess=false;
				$scope.errorAddCourse=false;
				$scope.errorAddCoursemessage=m;
			}

		})
	}
	}


$scope.hideListOfEnrolledStudents=function(){
	app.viewlistbutton=true;
}

$scope.viewSingleCourse=function(){
	       	var xy = {
				"title":$scope.title
				};
	        businessServ.viewOneCourse(xy).then(function(response){
	        console.log("EL ONE COURSE");
			console.log(response)
			$scope.testCourse= response.data.content
			var c =$scope.testCourse
			console.log(c);
			indexSrv.set(c);
			console.log(c.title);

		})
	    }


$scope.goBackProtofolio = function(){
	$location.path("/spPortofolio");
}



$scope.removeCourse = function(){
	$scope.removeCourse=indexSrv.get();
	console.log("HENA");
	var xy = {
		"title":$scope.removeCourse.title
	};
courseServ.removeCourse(xy).then(function(res){
 	$location.path('/oneCourse');
	
})
}


$scope.viewListOfEnrolledStudents = function(){
	var title=indexSrv.get();
	console.log("viewListOfEnrolledStudents");
	console.log(title.title);
	var title=title.title;
	console.log(title);
	var xy = {
		"title": title
	};
businessServ.viewListOfEnrolledStudents(xy).then(function(response){
 	console.log(response);
 	console.log("in the function");
			var flag=response.data;
			var f=flag.type;
			console.log(f);
			var m=flag.message;
			if(f=="ERROR"){
			app.viewlisterrormessage=false;
			app.messagesha=m;
		}else
			{
			app.ListOfEnrolledStudents=flag.content;
			app.holderrormessage=true;
			app.viewlistbutton=false;
			app.viewlisterrormessage=true;
			console.log(app.ListOfEnrolledStudents);
			}	
	})
									}



this.viewreviews = function(data){
courseServ.viewreviews(app.data).then(function(res){
	console.log(app.data)
	console.log(res)
	$scope.heba=res.data.content
})
								}


this.postannouncement =function(){
$location.path('/postannouncement');
test["title"]=y.title;
test["announcements"]=app.data.announcements;
		courseServ.postannouncement(test).then(function(response){
			console.log(response)
			console.log(app.data)
			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}
		})
	}

this.updatecourse =function(data){
		courseServ.updatecourse(app.data).then(function(res){
			console.log(app.data)
			console.log(res)
			
			if(res.data.type=='SUCCESS'){
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


	
	//////////////////////////////////////
	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			console.log(response)

			//$location.path('/register')
		})
	}
	////////////////////////////////////
	this.update = function(data){
			businessServ.updatePortofolio(app.data).then(function(response){
				console.log(response.data);
				//$scope.newPortofolio = response.data.content;
			})
		}

 
   // console.log( $scope.coursez)


	

	this.ServiceProviderViewCourse=function(){
		
		businessServ.ServiceProviderViewCourse().then(function(response){
			console.log("courses are:")
		     console.log(response)
			$scope.courses=response.data.content;
		});
			}


		businessServ.ServiceProviderViewPortofolio().then(function(response){
			//console.log(response)
			console.log(response.data.content)
      if(response.data.content === undefined ||response.data.content ===null || response.data.content === ""){
        console.log("in 1");
        $scope.profile=adminSrv.getSpProfile();
			}else if(($scope.profile != null ||  $scope.profile !="") && ( $scope.profile !=  undefined) ) {
        console.log("in 2");
        $scope.profile=response.data.content;

      }  else {
        console.log("in 3");

          $scope.profile=response.data.content;

      }



		})


})

