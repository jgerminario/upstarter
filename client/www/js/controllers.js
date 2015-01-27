angular.module('upstarter.controllers', [])

.controller('TestCtrl', ['$scope', 'Startup', function($scope, Startup) {
    $scope.test = "This is a test"
    // Startup.query().$promise.then(function(data){
    //   console.log(data)
    // })
    // console.log()
    $scope.startup = Startup.query();
    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
  }])

.controller('SearchCtrl', ['$scope', 'StartupNames', 'EmployeeRange', function($scope, StartupNames, EmployeeRange) {


    $scope.value = EmployeeRange.data;
    StartupNames.then(function(data){
      $scope.startups = data;
      console.log(data)
    })


    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
  }])

.controller('SliderCtrl', ['$scope', 'EmployeeRange',function($scope, EmployeeRange){

  $scope.value = EmployeeRange.data;

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
