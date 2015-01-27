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
Startup.find(function(err, startups){
  if (err) {console.log(err);}
  startups.forEach(function(startup){
    console.log(startup.name + "'s old momentum score was " + startup.momentumScore);
    startup.momentumScore = Startup.calculateMomentumScore(startup.threeYearRate, startup.twoYearRate, startup.oneYearRate, startup.number_of_employees);
    console.log(startup.name + "'s new momentum score is " + startup.momentumScore);
  });
});