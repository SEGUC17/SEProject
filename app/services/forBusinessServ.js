

angular.module('businessServ',[])

.factory('businessServ', function($http,AuthToken) {
    return {
        ServiceProviderRegister:function(data){
            return $http.post('/serviceprovider/register',data);


        },


        ServiceProviderAddCourse:function(data){
            return $http.post('/ServiceProvider/courses/addCourse',data);
        },
           ServiceProviderViewCourse:function(){
            return $http.get('/serviceprovider/courses');
        },
         ServiceProviderViewPortofolio:function(){
            return $http.get('/ServiceProvider/viewPortofolio');
        },
          viewOneCourse:function(data){
            return $http.post('/getCourse',data);
        }, updatePortofolio : function(data){
            return $http.post('/serviceprovider/updatePortofolio',data);
        }



    
    };
})

