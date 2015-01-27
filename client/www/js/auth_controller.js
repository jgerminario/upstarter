angular.module('upstarter.auth.controllers', [])

.controller("LoginCtrl", ["$scope", "$rootScope", '$http', '$location', '$window', function($scope, $rootScope, $http, $location, $window) {
    // $scope.test = $rootScope.token
    $window.location.href="http://localhost:3000/auth/linkedin";
    $http.get('http://localhost:3000/auth/token')
      .success(function(response){
        console.log(response)
      });
}])

.controller('LogoutCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.token
  $location.path('http://localhost:3000/auth/logout')
})
