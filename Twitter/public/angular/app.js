var app = angular.module('TwitterApp', ['ngRoute'])

app.controller('MainController', ['$scope', function ($scope) {
    $scope.name = "testing controller"
}])

app.controller('AuthController', ['$scope', '$location', 'authentication', function ($scope, $location, authentication) {
	$scope.controller = "register controller";

	$scope.login = function(user){
		authentication.login(user, loginResult)
	}

	$scope.register = function(user){
		authentication.register(user, registerResult)
	}

	$scope.logout = function(){

	}

	registerResult = function(data){
		$location.path("home");
		if (data.state === "failure") {
			$location.path("register");
		} else{
			$location.path("home");
		}
	}

	loginResult = function(data){
		if (data.state === "failure") {
			$location.path("login");
		} else{
			$location.path("home");
		}
	}
}])

app.controller('HomeController', ['$scope','tweetsService', function ($scope, tweetsService) {
    $scope.name = "home controller";

    $scope.create = function(tweet){
    	tweet.name = "nameasfd";
    	tweetsService.createTweet(tweet,success,error);
    }

    function success(data){
    	console.log(data);
    }

    function error(data){
    	console.log(data)
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
		// .when('/logout', {
		// 	templateUrl: 'signout',
		// 	controller: 'AuthController'
		// })
		.when('/home', {
			templateUrl: 'home',
			controller: 'HomeController'
		})
});
