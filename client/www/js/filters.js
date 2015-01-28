angular.module('upstarter.filters', [])
// these are globally available filters
.filter('cityFilter', function() {
  return function(input) {
    // the filter takes
    console.log(input.offices[0].city)
      if (input.offices[0].city === main.cityInput){
        return input

    }
  };
})

.filter('employeeRange', function () {
  //need to use items for an array
  return function (items, upperBound) {
    console.log("HEY there str number", upperBound);
    var filtered = [];

    var upperBound = parseInt(upperBound);
//need to loop through our array of objects
    for (var i = 0; i < items.length; i++) {
      var item = items[i];


//then create a test to filter them by
      // if ((item.employees >= number - 100) && (item.employees <= number + 100)) {

        // filtered.push(item);

      // }
    }
    // return filtered;
  };
});

