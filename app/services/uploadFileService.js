

angular.module('uploadFileService', [])

.service('uploadFile', function($http) {
    this.upload = function(file) {
        var fd = new FormData();
        fd.append('myfile', file.upload);
        return $http.post('/studentupload', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };

    this.logoUpload = function(file) {
        var fd = new FormData();
        fd.append('myfile', file.upload);
        return $http.post('/logoupload', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
    };

});