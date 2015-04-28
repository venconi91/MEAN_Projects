var app = angular.module('TwitterApp', [])

app.controller('MainController', ['$scope', function ($scope) {
    $scope.name = "testing controller"
}])