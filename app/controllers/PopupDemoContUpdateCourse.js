angular.module('PopupDemoContUpdateCourse',['courseServ']).
controller('PopupDemoContUpdateCourse', ['$scope','$modal',function ($scope, $modal) {
            $scope.open = function () {
                var modalInstance = $modal.open({
					  controller: 'PopupCont',
                    templateUrl: 'views/updateCoursePopUp.html',
                });
            }

            this.updateCourse = function(data){
        console.log(this.data);
          courseServ.updateCourse(this.data).then(function(response){
            console.log(response)
            //$location.path('/register')
        })
    }
        }]);
        myApp.controller('PopupCont', ['$scope','$modalInstance',function ($scope, $modalInstance) {
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.ok = function () {
                $modalInstance.close();
            };
        }]);