
angular.module('PopupDemoContRemoveCourse',['courseServ']).
.controller('PopupDemoContRemoveCourse', ['$scope','$modal',function ($scope, $modal) {
            $scope.open = function () {
                var modalInstance = $modal.open({
					  controller: 'PopupCont',
                    templateUrl: 'views/removeCoursePopUp.html',
                });
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
