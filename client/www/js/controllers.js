angular.module('upstarter.controllers', [])

.controller('SearchCtrl', ['$scope', '$timeout', 'InitialSeed', 'Startup', 'StartupNames', 'colorScore', 'EmployeeRange', 'Geolocation', '$location', '$cookieStore', function($scope, $timeout, InitialSeed, Startup, StartupNames, colorScore, EmployeeRange, Geolocation, $location, $cookieStore) {
    $scope.distance = 100;
    $scope.employees = 1000;

    var lat = window.localStorage['lat'] || 37.7846359
    var lon = window.localStorage['lon'] || -122.3975407
    var distance = 0
    var params = {
      "full": "true",
      "limit": 10,
      "location": distance + "," + lat + "," + lon,
      "employees": ""
      // must look like "5,31.722,-123.342"
    };

  navigator.geolocation.getCurrentPosition(function(position){
    window.localStorage['lon'] = position.coords.longitude;
    window.localStorage['lat'] = position.coords.latitude;
    lat = window.localStorage['lat'];
    lon = window.localStorage['lon'];

    params.location = distance + "," + lat + "," + lon;
  }, Geolocation.onError);


 $scope.search_radius = function(radius){
      $scope.loading = true;
      $scope.empty = null;
      distance = radius;
       if(timer){
        $timeout.cancel(timer);
      }
      timer= $timeout(function(){
        params.location = distance + "," + lat + "," + lon;
        StartupNames(params).then(function(data){
          $scope.loading = null;
          $scope.startups = data.data;
          if (data.data.length == 0){
            $scope.empty = "No results found";
          } else {
            $scope.empty = null;
          }
        });
      }, 300);

 };

 $scope.search_employees = function(employees){
      $scope.loading = true;
      $scope.empty = null;
      if(timer){
        $timeout.cancel(timer);
      }
      timer = $timeout(function(){
        params.employees = employees;
        StartupNames(params).then(function(data){
          $scope.loading = null;
          $scope.startups = data.data;
          if (data.data.length == 0){
            $scope.empty = "No results found";
          } else {
            $scope.empty = null;
          }
        });
      }, 300);
};

    var timer = false;
    $scope.setSearch = function(string){
      $scope.loading = true;
      $scope.empty = null;
      if(timer){
        $timeout.cancel(timer);
      }
      timer = $timeout(function(){
        params.string = string;
        StartupNames(params).then(function(data){
          $scope.loading = null;
          $scope.startups = data.data;
          if (data.data.length == 0){
            $scope.empty = "No results found";
          }
          else {
            $scope.empty = null;
            angular.forEach($scope.startups, function(startup,index){
              if(!startup.short_description){
                Startup(startup.slug).then(function(data, error){
                  if (data.error) {
                    $scope.startups[index].name = null; // will remove startups that no longer have data available in CrunchBase
                  }
                  else if (data){
                    $scope.startups[index] = data;
                  } else {
                    console.log('removing startup');
                  }
                });
              }
            });
          }
          console.log($scope.startups);
        });
      }, 300);
    };

    $scope.startups = JSON.parse(localStorage["initialSeed"]);

    if ($location.search().token) {
      $cookieStore.put('token', $location.search().token);
    }

    $scope.colorScore = function(score) {
      if (score > 80) {
        return "hot-startup";
      }
      else if (parseInt(score) > 60) {
        return "lukewarm-startup";
      }
      else if (parseInt(score) > 40) {
        return "not-so-good-startup";
      }
      else if (parseInt(score) < 40) {
        return "cold-startup";
      }
    }
    // $scope.$watch('main.searchInput.name', function(e) { console.log('something changed'); },true);

    // TODO: institute a listener so as the models change on the view, these elements will change

    // $http.get("http://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef").success(function(data){



}])

.controller('StartupDetailCtrl', ['$scope','Startup', '$stateParams', '$http', 'colorScore', 'Authenticate', function($scope, Startup, $stateParams, $http, colorScore, Authenticate) {


  Startup($stateParams.startupName).then(function(data){
    $scope.startup = data[0];
  });

  var startupConnections = [];
  if (Authenticate.token) {
    $http.get('http://upstarter-server.herokuapp.com/users/connections/'+Authenticate.token)
      .error(function(message){
        console.log(message);
      })
      .success(function(data){
      angular.forEach(data.values, function(connection,key){
          if (connection.positions){
            if (connection.positions.values) {
              connection.positions.values.forEach(function(position){
                if (position.company){
                  if (position.company.name){
                    if (position.company.name.match($scope.startup.name)){
                      startupConnections.push(connection);
                      $scope.startupConnections = startupConnections;
                    }
                  }
                }
              });
            }
          }
        });
    });
  }

    $scope.colorScore = function(score) {
      console.log("the score is " + score)
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
      }
    };

}]);

