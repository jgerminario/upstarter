// var kue = require('kue'),
  // jobs = kue.createQueue();//need redis credentials?
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api.js');
var startupAPI = require('./seeds');

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');



// function APIlookupSingle (){
//  var job = jobs.create('api_job');
//  job
//    .on('complete', function (){
//      console.log('Job', job.id, 'with name', job.data.name, 'is    done');
//    })
//    .on('failed', function (){
//      console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
//    });
//  job.save();
// }
// jobs.process('api_job', function (job, done){
//  done();
// });


setInterval(function (){
  console.log('processing');
   startupAPI.updateStartup();
}, 2000);

module.exports = router;
