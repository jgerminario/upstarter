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
    console.log(searchParams)
    var distance_str = "";
    var string_str = "";
    var employees_str = "";

    distance = searchParams.location.split(',')[0]
    if (distance > 0){
      distance_str = "&location=" + searchParams.location
    }
    if (searchParams.string){
      string_str = "&string=" + searchParams.string
    }
    if (searchParams.employees){
      employees_str = "&employees=" + searchParams.employees
    }
    return $http({
    method: 'GET',
    // url: "http://localhost:3000/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + string_str + distance_str + employees_str,
    url: "http://upstarter-server.herokuapp.com/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + string_str + distance_str + employees_str,
    contentType: "application/json",
  })
    .success(function(data,status){
      // console.log(data);
      // var company_array = data;
      // console.log(data)
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

// .factory('StartupScore', ['$http', '$q',
//   function($http, $q){
//   // var deferred = $q.defer();

//   return function(slug) {
//     return $http({
//     method: 'GET',
//     // url: "http://localhost:3000/startups/score/" + startupSlug
//     // url: "http://upstarter-server.herokuapp.com/startups?full=" + searchParams.full + "&limit=" +searchParams.limit + string_str + distance_str,
//     contentType: "application/json",
//   })
//     .success(function(data,status){
//       console.log(data);
//       // var company_array = data;
//       // console.log(data)
//       return data;
//       // deferred.resolve(company_array);
//     })

//     .error(function(){
//       // deferred.reject('There was an error');
//       return "There was an error";
//     });
//   // return deferred.promise;
//   };
// }])

// individual page
.factory('Startup', ['$http', '$q',
  function($http, $q){

 return function(startupSlug) {
  var deferred = $q.defer();
    $http({
    method: 'GET',
    // url: "http://localhost:3000/startups/" + startupSlug,
    url: "http://upstarter-server.herokuapp.com/startups/" + startupSlug,
    contentType: "application/json",
  })
    .success(function(data, status){
      // console.log(status)
      if (status == 404){
        console.log("startup not found");
      }
      console.log(data);
      var momentumScore = document.getElementsByClassName('the-number');
      var momentumScoreNumber
      if (data[0]) {
        momentumScoreNumber = data[0].fundraisePercentile
      } else {
        momentumScoreNumber = data.fundraisePercentile
      }
      if (momentumScore[0]) {
        momentumScore[0].innerHTML = momentumScoreNumber

      if (momentumScoreNumber > 80) { momentumScore[0].classList.add('hot-startup') }
      else if (momentumScoreNumber > 60) { momentumScore[0].classList.add('lukewarm-startup') }
      else if (momentumScoreNumber > 40) { momentumScore[0].classList.add('not-so-good-startup') }
      else if (momentumScoreNumber < 40) { momentumScore[0].classList.add('cold-startup') }
      }

      var company_array = data;
      deferred.resolve(company_array);
    })

    .error(function(){
      return deferred.resolve({error: "error"});
    });
  return deferred.promise;
  };
}])


.factory('Authenticate', ['$cookieStore', function($cookieStore){

  var token = $cookieStore.get('token')

  return {
    token: token
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

    }
  }
})


.factory('Geolocation', function(){

      // var deferred = $q.defer();
        return {
          onSuccess:  function(position) {
          var latitude = position.coords.latitude
          var longitude  = position.coords.longitude

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

})

