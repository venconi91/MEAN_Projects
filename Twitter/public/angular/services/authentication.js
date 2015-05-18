app.factory('authentication', function ($http, $location, $log) {
    
    function toJSON(obj) {
        return angular.toJson(obj);
    }

    function register(user, registerResult) {
        $http({
            method: 'POST',
            url: 'signup',
            data: toJSON(user),
        }).success(function (data) {
            console.log("success service")
            registerResult(data)
        }).error(function (data) {
            console.log("errror service")
            registerResult(data);
            $log.warn(data)
        })
    }

    function login(user, loginResult) {
        $http({
            method: 'POST',
            url: 'login',
            data: toJSON(user),
        }).success(function (data) {
            loginResult(data)       
        }).error(function (data) {
            loginResult(data);
        })
    }

    return {
        login: login,
        register: register
    }
});