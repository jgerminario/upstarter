angular.module('upstarter.auth.controllers', [])

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

.controller('LogoutCtrl', ['$scope', '$rootScope'], function($scope, $rootScope){
  $scope.test = $rootScope.test
})
>>>>>>> checks rootscope as a viable option for access token storage
