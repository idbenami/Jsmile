var app = angular.module('JsmileApp', ['ngRoute']);  
app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.upload = function() {
        $scope.img = document.getElementById("img").value;
    }

    $scope.answer = "";
    $scope.submitAnswer = function() {
        $http.get('/answer').then(function(data) {
             // The speaking Function
             responsiveVoice.speak(data.data, "UK English Male");
        });
    };
}]);