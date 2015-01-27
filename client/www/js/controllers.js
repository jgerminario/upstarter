angular.module('upstarter.controllers', [])

.controller('TestCtrl', ['$scope', '$http', 'Startup', function($scope, $http,Startup) {
  $scope.test = "This is a test"
    // Startup.query().$promise.then(function(data){
    //   console.log(data)
    // })
    // console.log()
    $scope.startup = Startup.query();
    $http({
      method: 'GET',
      url: "http://localhost:3000/startups",
      contentType: "application/json",
      beforeSend: function(xhr) {
      var auth_str = "token " + "<%= ENV['UPSTARTER_KEY'] %>";
      }
    })
      .success(function(data, status, headers, config){
        console.log(data);
    });

    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
    // });
  }])

.controller('SearchCtrl', ['$scope', 'StartupNames', function($scope, StartupNames) {

  StartupNames.then(function(data){
    $scope.startups = data;
    console.log(data)
  })

    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
    }])

