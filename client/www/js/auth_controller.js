angular.module('upstarter.auth.controllers', [])

.controller("LoginCtrl", ["$scope", "$rootScope", '$location', '$window', '$http', 'Authenticate', '$cookieStore', function($scope, $rootScope, $location, $window, $http, Authenticate, $cookieStore) {

    $scope.login = function(){
      $window.location.href = 'http://192.168.1.228:3000/auth/linkedin'
    }

    $scope.logout = function() {
      document.cookie = 'accessToken=; Max-Age=0'
      // $http.get('http://localhost:3000/logout')
  	  $window.location.reload(true);
	  }

	  $scope.userId = Authenticate.userId

    // $scope.login = function(){
    // 	Authentication.login()
    // }

    // $scope.logout = function(){
    // 	Authentication.logout()
    // }
    // $cookieStore.get('accessToken')
    // console.log($cookieStore)
    // $scope.cookies = function(){
    //   var cookie = $cookieStore.get("accessToken")
    //   return cookie1
    // }
}])
