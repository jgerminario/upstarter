angular.module('upstarter.auth.controllers', [])

.controller("LoginCtrl", ["$cookieStore", "$scope", "$rootScope", '$http', '$location', '$window', function($scope, $rootScope, $http, $location, $window, $cookieStore) {

    $cookieStore.get('accessToken')

}])

.controller('LogoutCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.token
  $location.path('http://localhost:3000/auth/logout')
})
