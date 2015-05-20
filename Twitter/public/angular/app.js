var app = angular.module('TwitterApp', ['ngRoute']).run(function($rootScope){
	$rootScope.isAuthenticated = false;
})

app.controller('MainController', ['$scope','follow', function ($scope, follow) {
    $scope.name = "testing controller"

    $scope.follow = function(userId){
    	follow.follow(userId, followSuccess, followError);
    }

    followSuccess = function(successData){
    	console.log(successData)
    }

    followError = function(errorData){
    	console.log(errorData)
    }
}])

app.controller('AuthController', ['$scope', '$location', 'authentication','$rootScope', function ($scope, $location, authentication,$rootScope) {
	$scope.controller = "register controller";

	$scope.login = function(user){
		authentication.login(user, loginResult)
	}

	// TODO remove 
	$scope.user = {"username": "venconi","password":"venconi"};

	$scope.register = function(user){
		authentication.register(user, registerResult)
	}

	$scope.logout = function(){
		$rootScope.isAuthenticated = false;
	}

	registerResult = function(data){
		$location.path("home");
		if (data.state === "failure") {
			$location.path("register");
		} else{
			$rootScope.isAuthenticated = true;
			$location.path("home");
		}
	}

	loginResult = function(data){
		if (data.state === "failure") {
			$location.path("login");
		} else{
			$rootScope.isAuthenticated = true;
			$location.path("home");
		}
	}
}])

app.controller('HomeController', ['$scope', '$location','tweetsService', function ($scope,$location, tweetsService) {
    $scope.name = "home controller";

    $scope.create = function(tweet){
    	tweetsService.createTweet(tweet,success,error);
    }

    function success(data){
    	console.log(data);
    }

    function error(data){
    	console.log(data)
    }

    $scope.viewUserTweets = function(userId){
    	console.log(userId);
    	// todo service
    }
}])

app.config(function($routeProvider,$locationProvider){
	$routeProvider
		.when('/cur', {
			templateUrl: 'test',
			controller: 'CourseController'
		})
		.when('/login', {
			templateUrl: 'login',
			controller: 'AuthController'
		})
		.when('/register', {
			templateUrl: 'register',
			controller: 'AuthController'
		})
		.when('/users', {
			templateUrl: 'users',
			controller: 'MainController'
		})
		.when('/myTweets', {
			templateUrl: 'myTweets',
			controller: 'MainController'
		})
		.when('/home', {
			templateUrl: 'home',
			controller: 'HomeController'
		})
});
