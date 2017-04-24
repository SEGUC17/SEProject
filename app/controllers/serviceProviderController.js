angular.module('spctr',['businessServ','indexSrv','courseServ'])

// data  dy el object eli b5do mn el user w 3shn a access 7aga mo3yna mmkn a3ml data.field msln
.controller('spCon',function($http,$location,businessServ,indexSrv,$scope,courseServ){

var app =this;

  console.log("hi")
    $scope.coursez = indexSrv.get()
    var test ={};
    var y=$scope.coursez;
  var xx= {title:y.title}
  console.log(xx)

		indexSrv.GetCurrentUser().then(function(data){
		$scope.type=data.data.decoded.type
		
		if($scope.type=='ServiceProvider')
			app.isSP=true;
		else
	       app.isSP=false;


    });


    $scope.coursez = indexSrv.get()


  

this.viewannouncements = function(){
	
  

courseServ.viewannouncements(xx).then(function(res){
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

		// data["token"]=app.SPtoken;
		businessServ.ServiceProviderAddCourse(app.data).then(function(response){
			console.log(response)
			console.log(app.data)


		})
	}


// var heba="heba";
//    $scope.coursez=indexSrv.set(heba)
	this.OneCourse =function(data){

            
	        businessServ.viewOneCourse(app.data).then(function(response){
			console.log(response)
			$scope.oneCourse= response.data.content
			var c =$scope.oneCourse
			indexSrv.set(c);

			//$location.path('/singleCourse')
		        	//$scope.c="hi"
                   //console.log(app.data)


		})
	}
	this.update = function(data){
			businessServ.updatePortofolio(app.data).then(function(response){
				console.log(response.data);
				//$scope.newPortofolio = response.data.content;
			})
		}

 
   // console.log( $scope.coursez)


	

		businessServ.ServiceProviderViewCourse().then(function(response){
			// console.log(response)
			// console.log(response.data.content)
			console.log("courses are:")
		     console.log(response)
			$scope.courses=response.data.content
		
	


		});



		businessServ.ServiceProviderViewPortofolio().then(function(response){
			//console.log(response)
			console.log(response.data)

			$scope.profile=response.data.content
	


		})


})

