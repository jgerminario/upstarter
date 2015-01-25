angular.module('upstarter', [])

.filter('cityFilter', function() {
  return function(input) {
    // the filter takes and input and if true then checkmark
    if (input === $scope.startup.city){
      return $scope.startup.city;
    }
  };
});