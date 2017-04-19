angular.module('PopupPostAnnouncement',['courseServ']).
controller('PopupPostAnnouncement', ['$scope','$modal',function ($scope, $modal) {
            $scope.open = function () {
                var modalInstance = $modal.open({
					  controller: 'PopupCont',
                    templateUrl: 'views/postAnnouncementsPopUp.html',
                });
            }

            this.postAnnouncements = function(data){
        console.log(this.data);
          courseServ.postAnnouncements(this.data).then(function(response){
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

