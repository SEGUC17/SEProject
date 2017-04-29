angular.module('MainController', ['indexSrv','businessServ','uploadFileService','fileModelDirective'])
.controller('MainController',function($scope,indexSrv,$location,$rootScope,businessServ,uploadFile) {

  var app = this;

  indexSrv.getCatalog().then(function(res){
      $scope.catalog=res.data;
    })
    indexSrv.getCatalogedu().then(function(res){
      $scope.catalogedu=res.data;
    })

    indexSrv.getCatalogmusic().then(function(res){
      $scope.catalogmusic=res.data;
    })
    indexSrv.getCatalogfun().then(function(res){
      $scope.catalogfun=res.data;
        $scope.errorMessage=res;

      if(catalogfun.length()==0){
        $scope.errorMessage="Unfortunately, No Courses Available For This Type";
      }
    })
  });
