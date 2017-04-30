angular.module('spctr',['businessServ','indexSrv','courseServ','adminSrv','stServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope,courseServ,adminSrv,stServ){

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




console.log(businessServ.getB());
$scope.courseArray=['yasminy','3adi','tani','course','12','yasmin','toz'];
$scope.title=indexSrv.get();
$scope.testCourse={};
$scope.removeCourse={};

 $scope.coursez = indexSrv.getc()


this.updatedPortofolio = {
            field: 'def',
            email: '',
            description: '',
            username: '',
            organizationName: '',
            logo: '',
            address : '',
            polices : ''
            // password: ''
       	};



	// businessServ.ServiceProviderViewPortofolio().then(function(response){

 //          $scope.profile=response.data.content;
 //          	app.updatedPortofolio.field = $scope.profile.field;
 //          	app.updatedPortofolio.description = $scope.profile.description;
 //          	app.updatedPortofolio.username = $scope.profile.username;
 //          	app.updatedPortofolio.organizationName = $scope.profile.organizationName;
 //          	app.updatedPortofolio.mobileNumber = $scope.profile.mobileNumber;
 //          	app.updatedPortofolio.email = $scope.profile.email;
 //          	app.updatedPortofolio.address = $scope.profile.address;
 //          	app.updatedPortofolio.polices = $scope.profile.polices;



          	
 //    });

if(indexSrv.get().type == "ERROR")
this.errMessage=indexSrv.get().message;
else
this.succMessage=indexSrv.get().message;


     this.bookCourse = function(xx){
    	stServ.bookCourse({title : $scope.coursez.title}).then(function(response){
    		console.log("book response");
    		
    			// indexSrv.set(response.data)

    			if(response.data.type == "ERROR")
    				$scope.errMessage = response.data.message;
    			else 
    				$scope.succMessage = response.data.message;
   



    		console.log(response);
    	});

    }


$scope.errorMsg='';
$scope.isErr=false;
$scope.successMsg='';
$scope.isSuccess=false;


if(indexSrv.IsLoggedIn()){


indexSrv.GetCurrentUser().then(function(data){
		$scope.type=data.data.decoded.type
		
		if($scope.type=='ServiceProvider')
			app.isSP=true;
		else
	       app.isSP=false;


    });
}


// $scope.he='jjj';
// this.view=function(){
// 	console.log('inside');
//    $scope.he='heba';
// }

    $scope.coursez = indexSrv.get()
    var test ={};
    var y=$scope.coursez;
  var xx= {title:y.title}


  

this.viewannouncements = function(){
	
  

courseServ.viewannouncements(xx).then(function(res){
	// $location.path('/viewannouncements');
	 // $location.path('/viewreviews');
		console.log(res.data.content)
	console.log('bakrahaaaaakkkkkkkkkkkkkkk')
	console.log(xx)
	
			if(res.data.type=='ERROR'){
				 $location.path('/popup');
			}

	else{
	$scope.gina=res.data.content
	}
})
}
this.viewannouncements1 = function(){
	
  

courseServ.viewannouncements(xx).then(function(res){
	console.log(res.data.content)
	$location.path('/viewannouncements1');
	
		if(res.data.type=='ERROR'){
				 $location.path('/popup');
			}

		if(res.data.type=='ERROR1'){
				 $location.path('/popup1');
			}

	else{
	$scope.gina1=res.data.content
	}
	
})
}
this.removeAnnouncements = function(data){
	// data.courseTitle=$scope.gina;
	
	var xxx=indexSrv.get()
	console.log(xxx)
	
	console.log(data)
	var yyy=data;

   indexSrv.combine(xxx,yyy);

   var send=indexSrv.get();
	
indexSrv.removeAnnouncements(send).then(function(res){
	if(res.data.type=='ERROR'){
				 $location.path('/popup1');
			}
  console.log("removeAnnouncements")
	console.log(res)
	// $location.path('/removeAnnouncements');
    $scope.gina="";
   
courseServ.viewannouncements(xx).then(function(res2){
	// $location.path('/viewannouncements');
	 // $location.path('/viewreviews');
		console.log(res.data.content)
	console.log('bakrahaaaaakkkkkkkkkkkkkkk')
	console.log(xx)
	
			if(res.data.type=='ERROR'){
				 $location.path('/popup');
			}

	else{
	$scope.gina=res2.data.content
	}
})
	
})
}



this.viewreviews = function(data){
courseServ.viewreviews(app.data).then(function(res){
	console.log(app.data)

	console.log(res)
	//$location.path('/viewreviews');
	$scope.heba=res.data.content
})
}

this.postannouncement =function(){
$location.path('/postannouncement');
test["title"]=y.title;
test["announcements"]=app.data.announcements
		// data["token"]=app.SPtoken;
		courseServ.postannouncement(test).then(function(response){

			console.log(response)
			console.log(app.data)
			
			// console.log(test)
			if(response.data.type=='ERROR'){
				 $location.path('/popup1');
			}

		if(response.data.type=='ERROR1'){
				 $location.path('/popup2');
			}

			if(response.data.type=='SUCCESS'){
				 $location.path('/home');
			}


		})
	}

	this.updatecourse =function(data){
    //$location.path('/updatecourse');
		// data["token"]=app.SPtoken;
		courseServ.updatecourse(app.data).then(function(res){
			console.log(app.data)
			console.log(res)
			if(res.data.type=='ERROR1'){
				 $location.path('/popup1');
			}

		if(res.data.type=='ERROR'){
				 $location.path('/popup3');
			}
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

	$scope.goBackProtofolio = function(){
	$location.path("/spPortofolio");
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
 	$location.path('/courseDemo');
	
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
			console.log('list of')
			console.log(app.ListOfEnrolledStudents);
			}	
	})
									}




	app.redirectCourse=function(course){

    var set=course;
    indexSrv.set(set);
    // console.log(set)
    var coursejson={};
    coursejson['title']=indexSrv.get();
     businessServ.viewOneCourse(coursejson).then(function(response){
			console.log(response)
			$scope.oneCourse= response.data.content
			var c =$scope.oneCourse
			indexSrv.set(c);
			$location.path('/coursesp');

		})


}



// var heba="heba";
//    $scope.coursez=indexSrv.set(heba)
	this.OneCourse =function(){

            var get=indexSrv.get();
            console.log(get);
	       
	}
	//////////////////////////////////////
	this.newReg = function(data){
		console.log(this.data);
		  businessServ.ServiceProviderRegister(this.data).then(function(response){
			// console.log(response)

			if(response.data.type=='SUCCESS'){
				$scope.errorMsg='';
                $scope.isErr=false;
			$scope.isSuccess=true;
			$scope.successMsg="You have registered Successfully , please wait for an email with your username and password in order to login";
		}else
		{

			 $scope.isErr=true;
			$scope.errorMsg=response.data.message;
	
		}


			//$location.path('/register')
		})
	}
	////////////////////////////////////
	
		this.update = function(){

			businessServ.updatePortofolio(this.updatedPortofolio).then(function(response){
				console.log(response.data);
				if(response.data.type == "ERROR"){
					
					$scope.errorMessage = response.data.message;
				} else {
				
					$scope.successMessage = response.data.message;

				}
			})
		}

 
   // console.log( $scope.coursez)


	

   
if($scope.type=='ServiceProvider' || $scope.type=='Admin'){


			businessServ.ServiceProviderViewCourse().then(function(response){
			// console.log(response)
			// console.log(response.data.content)
			console.log("courses are:")
			var array=[];
		     console.log(response.data)
			$scope.courses=response.data.content
			if(response){
			for(var i=0; i<$scope.courses.length;i++){
				array[i]=$scope.courses[i].title;
			}
		}
			console.log("titles");
			$scope.titles=array;
			console.log(array);
		
	


		});

		




		businessServ.ServiceProviderViewPortofolio().then(function(response){
			console.log("in hereeeeeeeeeeeeeee");
			console.log(response)
			console.log(response.data.content)
      if(response.data.content === undefined ||response.data.content ===null || response.data.content === ""){
        console.log("in 1");
        $scope.profile=adminSrv.getSpProfile();
			}else if(($scope.profile != null ||  $scope.profile !="") && ( $scope.profile !=  undefined) ) {
        console.log("in 2");
           $scope.profile=response.data.content;
          app.updatedPortofolio.field = $scope.profile.field;
          	app.updatedPortofolio.description = $scope.profile.description;
          	app.updatedPortofolio.username = $scope.profile.username;
          	app.updatedPortofolio.organizationName = $scope.profile.organizationName;
          	app.updatedPortofolio.mobileNumber = $scope.profile.mobileNumber;
          	app.updatedPortofolio.email = $scope.profile.email;
          	app.updatedPortofolio.address = $scope.profile.address;
          	app.updatedPortofolio.polices = $scope.profile.polices;

          	console.log($scope.profile);
          	console.log(response);

      }  else {
        console.log("in 3");


          $scope.profile=response.data.content;
          app.updatedPortofolio.field = $scope.profile.field;
          	app.updatedPortofolio.description = $scope.profile.description;
          	app.updatedPortofolio.username = $scope.profile.username;
          	app.updatedPortofolio.organizationName = $scope.profile.organizationName;
          	app.updatedPortofolio.mobileNumber = $scope.profile.mobileNumber;
          	app.updatedPortofolio.email = $scope.profile.email;
          	app.updatedPortofolio.address = $scope.profile.address;
          	app.updatedPortofolio.polices = $scope.profile.polices;

          	console.log($scope.profile);
          	console.log(response);


      }



		})

}






})

