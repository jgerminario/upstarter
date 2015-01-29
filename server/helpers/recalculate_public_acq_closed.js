var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api');
var startupAPI = require('./seeds');

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connection started")
});

console.log("starting 'find' operation (this may take a while)");

Startup.find().where('public').exists(false).where('description').exists(true).exec(function(err,startups){
  var i = 0;
  if (err) {console.log(err); }

  console.log("beginning seed");

  setInterval(function (){
    if (i>startups.length){ throw new Error("All records have been updated")}
    console.log('processing number ' + i);
    startupAPI.updateStartup(startups[i]);
    i++;

  }, 2000);
});