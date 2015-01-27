angular.module('upstarter.services', ['ngResource'])

.factory('Startup', ['$resource',
  function($resource){
    var Startup = $resource('test.json', {}, {
      query: {method: "GET", isArray: false}
      // get: {method: "GET"}
    });
  return Startup;
}])
.factory('Test', [
  function(){
    return "Hello";
}])

.factory('StartupNames', ['$http', '$q',
  function($http, $q){
  var deferred = $q.defer();
  // console.log($q)
  // console.log(deferred)
  $http.get('names.json')
    .success(function(data){
      company_array = []
      angular.forEach(data.data.items, function(value, key){
        company_array.push(value);
        // console.log(value)
      })
      deferred.resolve(company_array);
      // console.log(deferred)
    })
    .error(function(){
      deferred.reject('There was an error');
    })
  // console.log("Predeferred")
  // console.log(deferred)
  return deferred.promise;
  // return {
  //   all: function() {
  //     return request;
  //   }
  // }
  // var get_names = function(){
  //   list = Companies.query()
  //   console.log(list)
  //   name_array = []
  //   angular.forEach(Companies.items, function(value, key){
  //     name_array << value.name;
  //     console.log(name_array)
  //   })
  //   return name_array
  // }


}])

.factory('EmployeeRange', function(){
  var data = null;
  return {
    getData: function(){
    var data = null;
    return {
      getData: function(){
  }
})

.factory('Startups', function() {

  var startups = [
    { name: 'Google', id: 1 },
    { name: 'Yahoo', id: 2 },
    { name: 'Microsoft', id: 3 }
    ];

  return {
      getStartup: function(name) {

       startups.forEach(function(startup){
        if (startup.name === name ){
          console.log(startup)
          return startup


        }
      })
    }
  }

});

// flowers.forEach(function(flower){
//       if (flower.color === "yellow"){
//       colorArray.push(flower);
//         }
    return {data: ""}
