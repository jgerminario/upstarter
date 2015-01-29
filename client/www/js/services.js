angular.module('upstarter.services', ['ngResource'])

// On load of first page
.factory('InitialSeed', ['$http', '$q',
  function($http, $q){
  var deferred = $q.defer();
    $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups?full=true&limit=10"
    })
  .success(function(data,status){
        // console.log(data);
        var company_array = data;
        deferred.resolve(company_array);
      })

      .error(function(){
        deferred.reject('There was an error');
      });
    return deferred.promise;
  }])


// Recurring query
.factory('StartupNames', ['$http', '$q',
  function($http, $q){
  // var deferred = $q.defer();

  return function(searchParams) {
    var distance_str = ""
    if (searchParams.distance > 0){
      distance_str = "&location=" + searchParams.location
    }
    return $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + "&string=" + searchParams.string + distance_str,
    contentType: "application/json",
  })
    .success(function(data,status){
      // console.log(data);
      // var company_array = data;
      return data;
      // deferred.resolve(company_array);
    })

    .error(function(){
      // deferred.reject('There was an error');
      return "There was an error";
    });
  // return deferred.promise;
  };
}])

// individual page
.factory('Startup', ['$http', '$q',
  function($http, $q){

 return function(startupSlug) {
  var deferred = $q.defer();
    $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups/" + startupSlug,
    contentType: "application/json",
  })
    .success(function(data,status){
      var momentumScore = document.getElementsByClassName('the-number');
      // if data.fundraisePercentile
      console.log(data["fundraisePercentile"])
      // momentumScore[0]
      console.log("this is momentum score", momentumScore[0].innerHTML)
        momentumScore[0].innerHTML = data.fundraisePercentile
      if (!momentumScore[0].innerHTML) { console.log("no innerHTML yet!")}
      var company_array = data;
      deferred.resolve(company_array);
    })

    .error(function(){
      deferred.reject('There was an error');
    });
  return deferred.promise;
  };
}])


.factory('Authenticate', ['$cookieStore', function($cookieStore){

  var userId = $cookieStore.get('userId')

  return {
    userId: userId
  }

}])

.factory('colorScore', function() {
  return {
    colorScore: function(score) {
      console.log(score)
      if (parseInt(score) > 80) {
        return "hot-startup"
      }
      else if (parseInt(score) > 60) {
        return "lukewarm-startup"
      }
      else if (parseInt(score) > 40) {
        return "not-so-good-startup"
      }
      else if (parseInt(score) < 40) {
        return "cold-startup"
    } else {
        return "cold-startup"
    }
  }}
})

.factory('EmployeeRange', function(){
  var data = null;
  return {
    getData: function(){
    var data = null;
    return {
      getData: function(){
    }
  };
}
};

})



.factory('Geolocation', function(){

      // var deferred = $q.defer();
        var onSuccess =  function(position) {
          var longitude = position.coords.latitude
          var latitude = position.coords.longitude
         console.log(position.coords.latitude)
         console.log(position.coords.longitude)
         window.localStorage['lon'] = position.coords.longitude;
         window.localStorage['lat'] = position.coords.latitude;

         // deferred.resolve(longitude);
        };

        var onError = function(error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
        };
})
