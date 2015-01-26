angular.module('upstarter.filters', [])
// these are globally available filters
.filter('cityFilter', function() {
  return function(input) {
    // the filter takes
      if (input.city === main.cityInput){
        return input

    }
  };
})

.filter('employeeRange', function () {
  //need to use items for an array
  return function (items, strNumber) {

    var filtered = [];
    var number = parseInt(strNumber);
//need to loop through our array of objects
    for (var i = 0; i < items.length; i++) {
      var item = items[i];


//then create a test to filter them by
      if ((item.employees >= number - 100) && (item.employees <= number + 100)) {

        filtered.push(item);

      }
    }
    return filtered;
  };
});

