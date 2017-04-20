angular.module('searchctr',['searchServ'])
.controller('searchController', function($scope,$location,$http,searchServ) {


ctrl($scope);

 
// function ctrl($scope){
    
    $scope.searcBy="title";
    $scope.key2="social";
    $scope.types=[{id:1,name:"title"},{id:2,name:"type"},{id:3,name:"centerLocation"},{id:4,name :"centerName"}]
        
    $scope.changedValue=function(type){
    $scope.searBy=type.name;
    console.log( $scope.searBy)
 
    }  

    $scope.key2=function(key){
       $scope.key2=key ;
         console.log($scope.key2)


        if($scope.key2.length>3)
        {
          searchServ.search($scope.key2,$scope.searchBy);

          // $location.url('/search');
        }
        else {
        
        }
          $location.url('/search');

    } 


    
//}

  // $scope.search = function(key) {
       
      
  //       $location.url('/search');
        
  //   };

});


