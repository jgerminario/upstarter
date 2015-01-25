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

.controller('SearchCtrl', ['$scope', 'StartupNames', function($scope, StartupNames) {

    StartupNames.then(function(data){
      $scope.startups = data;
      console.log(data)
    })

    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){
  }])

// .controller('FilterCtrl', function(){
//   this.tab = null;
//   this.selectTab = function(setTab) {
//     this.tab = setTab;
//   };
//   this.isSelected = function(checkTab){
//     return this.tab === checkTab;
//     console.log(this.tab)
//   };
// })
