
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api.js');

var startupAPI = (function (){

  var findRandomStartup = function (startups){
    console.log("test");
    var count = startups.length,
        rand_num = Math.floor(Math.random() * count),
        startup_to_update = startups[rand_num];
    while (startup_to_update.description){
      rand_num = Math.floor(Math.random() * count);
      startup_to_update = startups[rand_num];
    }
    console.log("Updating " + startup_to_update.name);
    Startup.findById(startup_to_update.id, function(err, data){
      makeAPICall(err, data);
    });
  };

  var makeAPICall = function (err, startup){
    organizationEndpoint.sendCBRequest(startup._id, startup.slug);
  };

  return {
    updateStartup: function(startups){
      findRandomStartup(startups);
    }
  };

})();

// var getAllStartups = function (){
    // console.log(count);
    // var startup_to_update = startups[371];
    // console.log(startup_to_update);
    // Startup.findById("54c3fe2f98a0ee617841ef35", function(err, startup_to_update){
    // });
// };

module.exports = startupAPI;