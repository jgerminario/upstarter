angular.module('upstarter.auth.controllers', [])

.controller('LoginCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.test
})

.controller('LogoutCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.test
})
