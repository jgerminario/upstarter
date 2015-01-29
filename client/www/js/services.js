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
    .success(function(data, status){
      var momentumScore = document.getElementsByClassName('the-number');
      var momentumScoreNumber = data[0].fundraisePercentile
      momentumScore[0].innerHTML = momentumScoreNumber

      if (momentumScoreNumber > 80) { momentumScore[0].classList.add('hot-startup') }
      else if (momentumScoreNumber > 60) { momentumScore[0].classList.add('lukewarm-startup') }
      else if (momentumScoreNumber > 40) { momentumScore[0].classList.add('not-so-good-startup') }
      else if (momentumScoreNumber < 40) { momentumScore[0].classList.add('cold-startup') }

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
});
