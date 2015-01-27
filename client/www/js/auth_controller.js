angular.module('upstarter.auth.controllers', [])

<<<<<<< HEAD
<<<<<<< HEAD
.controller("LoginCtrl", ["$scope", "$rootScope", '$location', '$window', function($scope, $location, $window, $rootScope) {

    $scope.oauth = function(){
      window.location.href = 'http://localhost:3000/auth/linkedin'
    }

    $scope.delete_cookie = function() {
      document.cookie = 'accessToken=; Max-Age=0'}
    // $cookieStore.get('accessToken')
    // console.log($cookieStore)
    // $scope.cookies = function(){
    //   var cookie = $cookieStore.get("accessToken")
    //   return cookie1
    // }
}])
=======
.controller('LoginCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.test
})
=======
.controller("LoginCtrl", ["$scope", "$rootScope", '$http', '$location', '$window', function($scope, $rootScope, $http, $location, $window) {
    // $scope.test = $rootScope.token
    $window.location.href="http://localhost:3000/auth/linkedin";
    $http.get('http://localhost:3000/auth/token')
      .success(function(response){
        console.log(response)
      });
}])
>>>>>>> adds broken ajax call to server for access token

.controller('LogoutCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.token
  $location.path('http://localhost:3000/auth/logout')
})
>>>>>>> checks rootscope as a viable option for access token storage
