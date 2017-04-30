angular.module('MainController', ['indexSrv','businessServ','uploadFileService','fileModelDirective'])
.controller('MainController',function($route,$scope,$timeout,indexSrv,$location,$rootScope,businessServ,uploadFile) {


///////////////////////////////////////////
// this.getVerifiedServiceProvider=function(){
// indexSrv.getVerifiedServiceProvider().then(function(res){
// 		$scope.title=res.data
// 	})
// }
//////////////////////////////////////////////////////


$scope.studentcourses=[];

// if condition for student !!!!!!!!
if($scope.type=='Student'){

indexSrv.getStudentProfile().then(function(res){
  $scope.username=res.data[0];
  $scope.picture="uploads/"+res.data[1];
  console.log($scope.username)

  console.log(res)
  var i=2;
  var j=0;
  while(i<res.data.length){
$scope.studentcourses[j]=res.data[i];
i++;
j++;
  }
})

}




var app = this;
$scope.errorMsg='';
$scope.isErr=false;
$scope.successMsg='';
$scope.isSuccess=false;

$scope.file = {};
    $scope.message = false;
    $scope.alert = '';
    //$scope.default = 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg';

    $scope.Submit = function() {
        uploadFile.upload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.message;
                $scope.file = {};
                $scope.picture = "uploads/"+data.data.img;
            } else {
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
                $scope.picture = "/uploads/avatar.png"
            }
        });
    };
    
    $scope.logo = "/uploads/avatar.png";
    $scope.logoSubmit = function() {
        uploadFile.logoUpload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.message;
                $scope.file = {};
                $scope.logo = "uploads/"+data.data.img;
            } else {
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
                $scope.logo = "/uploads/avatar.png"
            }
        });
    };


$rootScope.$on('$routeChangeStart',function(){



			if(indexSrv.IsLoggedIn()){
			console.log("success user is logged in")
			indexSrv.GetCurrentUser().then(function(data){
			console.log(data.data)
			 $scope.SPusername=data.data.decoded.username
			  app.islogged = true;
			  $scope.type=data.data.decoded.type
			 if($scope.type=='ServiceProvider')
			 	app.isSP=true;
			 else
			    app.isSP=false; 	
			 if($scope.type=='Student')
			 	app.isST=true;
			 else
			    app.isST=false; 	



			         });
			      }
			         else
			          {
			  console.log("user is not logged")
			  	$scope.SPusername='';
              app.islogged = false;


			    }




})


// this function get all available courses
		// this.viewCatalog= function(){


		//  indexSrv.getCatalog().then(function(res){
		//  	//console.log(res.data)
		//   $scope.catalog=res.data.content;
		// })

		// }



 indexSrv.getCatalog().then(function(res){
		 	var stArr=[];
      $scope.catalog=res.data;
      // console.log(res.data[0][1]);
      for(var i=0;i<$scope.catalog.length;i++){
      	stArr[i]=$scope.catalog[i][1];
      }
      console.log('my new array');
      console.log(stArr);
      indexSrv.set(stArr);
       $scope.catalog1=stArr;





    })





    indexSrv.getCatalogedu().then(function(res){
      $scope.catalogedu=res.data;
    })

    indexSrv.getCatalogmusic().then(function(res){
      $scope.catalogmusic=res.data;
    })
    indexSrv.getCatalogfun().then(function(res){
      $scope.catalogfun=res.data;
    })



this.addReview=function(data){
var test={};
	console.log("hellooooo")
	console.log(data)
 test['courseTitle']=indexSrv.get();
 test['review']=app.data.review;
 test['isNeg']=app.data.isNeg;
 console.log(test)
 $scope.errorMessage=false;
 $scope.loading=true;
	// data.courseTitle=indexSrv.get();
	//console.log( data['courseTitle']);
	// console.log(data);
	if(app.data.review!=null && app.data.isNeg!=null){
	
	indexSrv.postReview(test).then(function(res){
    $timeout(function(){
    $scope.loading=false;
    $scope.successMessage="Thank You :) Your Review has been submitted.";
	
},1000);
        $timeout(function(){
 $('#review').modal('hide');
 $location.reload(true);
},1500);

	
	
 })

}
/*else{

$scope.errorMessage="Please Enter Your Review Correctly !";
$scope.loading=false;

}*/

if(app.data.review==null && app.data.isNeg!=null){
$scope.errorMessage="Please Leave Your Comment !";
$scope.loading=false;
}

if(app.data.review!=null && app.data.isNeg==null){
$scope.errorMessage="Please Choose Like or Dislike !";
$scope.loading=false;
}


if(app.data.review==null && app.data.isNeg==null){
app.errorMessage="Please Enter Your Review Correctly !";
$scope.loading=false;
}


  
}







app.redirectCourse=function(course){

    var set=course;
    indexSrv.set(set);


 $scope.coursez=indexSrv.get();

 //$location.path('/studentprofile/review')

}


			










 
 $scope.coursez=indexSrv.get()








	this.OneCourse =function(data){
console.log('first thing')
    indexSrv.set(data);
    // console.log(set)
    var coursesjson={};
    coursesjson['title']=indexSrv.get();
     businessServ.viewOneCourse(coursesjson).then(function(response){
			console.log(response)
			$scope.oneCourse= response.data.content
			var c =$scope.oneCourse
			indexSrv.set(c);
			businessServ.setB(c);
		   indexSrv.setc(c);


			console.log('oooooooo')
			console.log(indexSrv.get())
			$location.path('/coursepage');

		})


	}
	
	this.login=function(data){

		indexSrv.ServiceProviderLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)
			
			if(response.data.type=='SUCCESS'){
			$location.path('/spPortofolio')
			app.islogged = true;
				$scope.errorMsg='';
                $scope.isErr=false;
			$scope.isSuccess=true;
			$scope.successMsg=response.data.message;
             //////////////////////////////
            
/////////////////////////////////////////////////////////////
			}
			else{

			 app.islogged = false;
			 $scope.isErr=true;
			$scope.errorMsg=response.data.message;

			}


		})
	}




//student login
this.Student_login=function(data){
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)
			if(response.data.type=='SUCCESS'){
				$scope.errorMsg='';
                $scope.isErr=false;
			$scope.isSuccess=true;
			$scope.successMsg=response.data.message;
			$location.path('/welcome')
			app.islogged = true;

if(response.data.content.username=='Admin')	{
					// console.log("admin :: "+response.data.content);
					// console.log("admin type ::  "+response.data);
					$location.path('/adminPage');
			}


		}
			else{
			 app.islogged = false;
			  $scope.isErr=true;
			$scope.errorMsg=response.data.message;


			}


		})
	}



    $scope.types=[{searchBy:"title"},{searchBy:"type"},{searchBy:"centerLocation"},{searchBy :"centerName"}]




   app.search = function(data){
		// console.log(this.data);
	indexSrv.Search(this.data).then(function(response){
		 $scope.searchResult=response.data.content;
		 $scope.length=response.data.content.length ;
			// console.log(response)
			//$location.path('/register')
		})
		    $location.url('/search');
	}
	this.logout=function(){
		indexSrv.LogOut();
		console.log("log")
	    $location.path('/')


	}




  
});


	
