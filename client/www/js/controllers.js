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

.controller('SearchCtrl', ['$scope', 'StartupNames', 'EmployeeRange', function($scope, StartupNames, EmployeeRange) {


    $scope.value = EmployeeRange.getData();
    StartupNames.then(function(data){
      $scope.startups = data;
      console.log(data)
    })


    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
    }])

.controller('SliderCtrl', ['$scope', 'EmployeeRange',function($scope, EmployeeRange){


  $scope.value = "0;10000"
  EmployeeRange.setData($scope.value)
  $scope.options = {
    from: 0,
    to: 10000,
    step: 1,
    dimension: "  employees",
    scale: [0, '|', '|', 5000, '|' , , '|', 10],
      css: {
          background: {"background-color": "silver"},
          before: {"background-color": "purple"},
          default: {"background-color": "white"},
          after: {"background-color": "green"},
          pointer: {"background-color": "red"}
        }
  };

}]);
