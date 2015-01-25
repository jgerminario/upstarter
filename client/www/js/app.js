// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('upstarter', ['ionic', 'upstarter.controllers', 'upstarter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('test', {
    url: "/",
    templateUrl: "templates/test.html",
    controller: 'TestCtrl'
  })

    .state('search', {
    url: "/search",
    templateUrl: "templates/search.html",
    controller: 'SearchCtrl'
  })
   .state('companies', {
    url: "/companies",
    templateUrl: "templates/search.html",
    controller: 'CompanyCtrl'
  })
  //     .state('companyId', {
  //   url: "/companies/:companyId",
  //   templateUrl: "templates/search.html",
  //   controller: 'CompanyDetailCtrl'
  // })
  $urlRouterProvider.otherwise('/');
});
