
angular.module('MainController', ['indexSrv'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope) {
//console.log('main')

indexSrv.getVerifiedServiceProvider().then(function(res){
	$scope.title=res.data
})


var app = this;

			$rootScope.$on('$routeChangeStart',function(){

angular.module('MainController', ['indexSrv','businessServ','uploadFileService','fileModelDirective'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope,businessServ,uploadFile) {


///////////////////////////////////////////
// this.getVerifiedServiceProvider=function(){
// indexSrv.getVerifiedServiceProvider().then(function(res){
// 		$scope.title=res.data
// 	})
// }
//////////////////////////////////////////////////////

var app = this;


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
            } else {
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
            }
        });
    };

    $scope.Submitlogo = function() {
        uploadFile.logoUpload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.message;
                $scope.file = {};
            } else {
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
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
		this.viewCatalog= function(){


		 indexSrv.getCatalog().then(function(res){
		 	//console.log(res.data)
		  $scope.catalog=res.data.content;
		})

		}



app.redirectCourse=function(course){

    var set=course;
    indexSrv.set(set);
 $location.path('/studentprofile/review')

}


			


this.viewStudentProfile=function(){


$scope.studentcourses=[];
indexSrv.getStudentProfile().then(function(res){
  $scope.username=res.data.content[0];
  $scope.profilepicture=res.data.content[1];
  console.log($scope.username)

  console.log(res)
  var i=2;
  var j=0;
  while(i<res.data.content.length){
$scope.studentcourses[j]=res.data.content[i];
i++;
j++;
  }
})


}


 $scope.coursez=indexSrv.get()


this.addReview=function(data){
var test={};
	console.log("hellooooo")
	console.log(data)
 test['courseTitle']=indexSrv.get();
 test['review']=app.data.review;
 test['isNeg']=app.data.isNeg;
 console.log(test)
	// data.courseTitle=indexSrv.get();
	//console.log( data['courseTitle']);
	// console.log(data);
	indexSrv.postReview(test).then(function(res){
     console.log("my resss")
     console.log(res)
   $scope.listofreviews=res.data;

   })}


	this.OneCourse =function(data){

            
	        businessServ.viewOneCourse(app.data).then(function(response){
			console.log(app.data)

			$scope.oneCourse= response.data.content
			var c =$scope.oneCourse
			indexSrv.set(c);
			console.log(c)

			//$location.path('/coursepage')
		        	

		})
	}
	

	this.login=function(data){
		indexSrv.ServiceProviderLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){

			$location.path('/welcome')
			app.islogged = true;


			$location.path('/spPortofolio')
			app.islogged = true;
             //////////////////////////////
             if(response.data.decoded.type==='Admin'){

					$location.path('/adminPage')
					app.islogged = true;

				}
/////////////////////////////////////////////////////////////

			}
			else{
			 app.islogged = false;

			}


		})
	}

//student login
this.Student_login=function(data){
		indexSrv.StudentLogin(app.data).then(function(response){
			console.log(response.data)
			//console.log("the token is: "+response.data.token)

			if(response.data.type=='SUCCESS'){
			$location.path('/welcome')
			app.islogged = true;


			}

if(response.data.content.username=='Admin')	{
					// console.log("admin :: "+response.data.content);
					// console.log("admin type ::  "+response.data);
					$location.path('/adminPage');
			}
		}

			else{
			 app.islogged = false;

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
	
