var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api.js');
var startupAPI = require('./seeds');

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connection started");
});

// Startup.resetFundraisePercentile();
console.log("starting 'find' operation (this may take a while)");
Startup.find().or([{ acquired: true}, {public: true}, {closed: true }]).exec(function(err, data){
  if (err) {console.log(err); }
  data.forEach(function(startup){
    startup.momentumScore = 0;
    startup.fundraisePercentile = 0;
    startup.save(function(err, startup){
      if(err) {console.log(err); }
      console.log(startup.name + " has been processed");
    });
  });
});
Startup.where({funding_rounds: {$not: {$size: 0}}}).find(function(err, startups){
  if (err) {console.log(err);}
  startups.forEach(function(startup){
    console.log(startup.name + "'s old momentum score was " + startup.momentumScore);
    startup.momentumScore = Startup.calculateMomentumScore(startup.fiveYearRate, startup.threeYearRate, startup.oneYearRate, startup.number_of_employees);
    console.log(startup.name + "'s new momentum score is " + startup.momentumScore);
    startup.save(function(err,data){
      if(err){console.log(err);}
      // console.log("Saved " + data.name)
    });
  });
});