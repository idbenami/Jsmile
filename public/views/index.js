var app = angular.module('JsmileApp', ['ngRoute']);  
app.controller('mainController', ['$scope', function($scope) {
    $scope.upload = function() {
        $scope.img = document.getElementById("img").value;
    }
}]);