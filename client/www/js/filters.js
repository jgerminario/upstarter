angular.module('upstarter.filters', [])

.filter('cityFilter', function() {
  return function(input) {
    // the filter takes and input and if true then checkmark
      if (input.city === main.cityInput){
        return input

    }
  };
});