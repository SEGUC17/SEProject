angular.module('MainController', ['uploadFileService','fileModelDirective'])
.controller('MainController',function($scope,uploadFile) {



var app = this;


$scope.file = {};
    $scope.message = false;
    $scope.alert = '';
    $scope.picture = "/uploads/avatar.png"
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

    $scope.logoSubmit = function() {
        uploadFile.logoUpload($scope.file).then(function(data) {
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
});