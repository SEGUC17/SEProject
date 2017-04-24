angular.module('stServ',[])
.factory('stServ',function($http){
<<<<<<< HEAD

=======
	
>>>>>>> master
return{

   studentRegister : function(data){
   	return $http.post('/register',data).then(function(response){
   		//console.log("inside service")
   		console.log(response)
   	});
<<<<<<< HEAD
   }
}
=======

   }


}

   	}
      ,
     studentPayment: function(data){
      return $http.post('/charge',data).then(function(response){
      	console.log("HENAAA");
         console.log(response);
      });
   }
   }





>>>>>>> master
});
