var ToDoApp = angular.module('ToDoApp', []);

ToDoApp.controller("MainController",['$scope','$http', function($scope, $http) {
  $scope.toDoObj = {};
  
	$http.get('/ToDos')
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		
	$scope.createTodo = function(toDoObj)
	{
		$http.post('/CreateToDo',toDoObj)
		.success(function(data) {
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}
	
	$scope.deleteTodo = function(toDoId){
		$http.delete('/todos/' + toDoId)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	}
}]);