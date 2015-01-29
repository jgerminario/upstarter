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
    return $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + "&string=" + searchParams.string,
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
      // console.log(data);
      var company_array = data;
      deferred.resolve(company_array);
    })

    .error(function(){
      deferred.reject('There was an error');
    });
  return deferred.promise;
  };
}])



.factory('Authenticate', [ function(){
  var token
  document.cookie.split("; ").forEach(function(cookie){
      if (cookie.match(/accessToken=/g)){
        token = cookie.slice(12, cookie.length)
      } else {
        token = null
      }
    })

  return {
    token: token
  }
}])

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
  return {
        onSuccess:  function(position) {
          var longitude = position.coords.latitude
          var latitude = position.coords.longitude
         console.log(position.coords.latitude)
         console.log(position.coords.longitude)
         window.localStorage['lon'] = position.coords.longitude;
         window.localStorage['lat'] = position.coords.latitude;

         // deferred.resolve(longitude);
        },
        onError: function(error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
        }
      }
       // return deferred.promise;
})