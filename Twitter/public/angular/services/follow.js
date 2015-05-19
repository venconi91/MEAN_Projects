app.factory('follow', function ($http, $location, $log) {
    
    function toJSON(obj) {
        return angular.toJson(obj);
    }

    function follow(userId, followSuccess, followError) {
        $http({
            method: 'POST',
            url: 'follow',
            data: toJSON({"userId": userId}),
        }).success(function (data) {
            followSuccess(data)
        }).error(function (data) {
            console.log("errror follow")
            followError(data);
        })
    }

    return {
        follow: follow
    }
});