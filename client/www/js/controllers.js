angular.module('upstarter.controllers', [])

.controller('TestCtrl', ['$scope', 'Startup', function($scope, Startup) {
    $scope.test = "This is a test"
    $scope.startup = Startup.query();
    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
  }]);
