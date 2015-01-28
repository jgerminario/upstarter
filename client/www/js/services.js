angular.module('upstarter.services', ['ngResource'])

.factory('Startup', ['$resource', '$http', '$q',
  function($resource, $http, $q){

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

.factory('InitialSeed', ['$http', '$q',
  function($http, $q){
  var deferred = $q.defer();
    $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups?full=true&limit=20"
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

.factory('StartupNames', ['$http', '$q',
  function($http, $q){
  var deferred = $q.defer();


  return function(searchParams) {
    $http({
    method: 'GET',
    url: "http://upstarter-server.herokuapp.com/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + "&location=" +searchParams.location + "&string=" + searchParams.string,
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
});