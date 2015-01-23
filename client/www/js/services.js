angular.module('upstarter.services', ['ngResource'])

.factory('Startup', ['$resource',
  function($resource){
    return $resource('test.json', {}, {
      query: {method: "GET", isArray: false}
      // get: {method: "GET"}
    });
  }

])