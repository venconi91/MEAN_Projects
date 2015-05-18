app.factory('tweetsService', function ($http, $location, $log) {
    
    function toJSON(obj) {
        return angular.toJson(obj);
    }

    function createTweet(tweet, success, error) {
        $http({
            method: 'POST',
            url: 'createTweet',
            data: toJSON(tweet),
        }).success(function (data) {
            success(data)       
        }).error(function (data) {
            error(data);
        })
    }

    return {
        createTweet: createTweet
        //register: register
    }
});