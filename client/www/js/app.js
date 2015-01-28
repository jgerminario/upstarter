// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('upstarter', ['ionic', 'upstarter.auth.controllers', 'upstarter.controllers', 'upstarter.services', 'upstarter.filters','ngSlider', 'ngCookies'])

.run(function($ionicPlatform, $rootScope) {
  
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
    .state('search', {
    url: "/",
    templateUrl: "templates/search.html",
    controller: 'SearchCtrl'
  })
    .state('search-startup', {
    url: "/startups/:startupName",
    templateUrl: 'templates/startup-detail.html',
    controller: 'StartupDetailCtrl'
  })
    .state('test-login', {
      url: "/test",
      templateUrl: 'templates/test.html',
      controller: "LoginCtrl"
    })

  $urlRouterProvider.otherwise('/');
});
