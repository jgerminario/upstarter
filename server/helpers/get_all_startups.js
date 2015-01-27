var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api.js');
var startupAPI = require('./seeds');

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');

var count = 1;
var incrementUpdate = function () {
  console.log("processing " + count);
  if (count >= 300){
    throw new Error("All done with processing");
  }
  count++
  organizationEndpoint.fetchStartups(count);
};


setInterval(function (){
  console.log('processing');
   incrementUpdate();
}, 2000);

module.exports = router;
