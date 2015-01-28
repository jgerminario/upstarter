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
      // url: "http://upstarter-server.herokuapp.com/startups",
      url: "http://localhost:3000/startups/chevron",
      contentType: "application/json",
      // beforeSend: function(xhr) {
      // var str = "token 0HnLNRufyvmfYCPYvgkiM2jS3";
      // xhr.setRequestHeader("authorization", str);
      // }
    })
      .success(function(data,status){
        console.log(data);
      });

    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
    // });
  }])

.controller('SearchCtrl', ['$scope', 'InitialSeed', 'StartupNames', 'EmployeeRange', function($scope, InitialSeed, StartupNames, EmployeeRange) {

    $scope.value = EmployeeRange.getData();
    InitialSeed.then(function(data){
      $scope.startups = data;
      console.log(data)
    });

    // $scope.$watch('main.searchInput.name', function(e) { console.log('something changed'); },true);

    // TODO: institute a listener so as the models change on the view, these elements will change



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
}])

.controller('StartupDetailCtrl', ['$scope','Startup', '$stateParams', function($scope, Startup, $stateParams) {
  console.log($stateParams.startupName);
  Startup($stateParams.startupName).then(function(err,data){
    if (err) {console.log(err); }
    $scope.startup = data;
    console.log(data);
  });

//     $scope.startup = Startups.getStartup($stateParams.startupName)
//     var thing = $stateParams.getStartup($scope.startup.startupName)
// console.log(thing)
// console.log($scope.startup.startupName)

}])
