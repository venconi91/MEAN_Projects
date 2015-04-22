var ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller("MainController",['$scope', function($scope) {
  $scope.hi = "hello";
  $scope.createTodo = function(toDoText)
  {
	// send todo to server and save it to database
  }
}]);