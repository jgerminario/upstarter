
// var kue = require('kue'),
  // jobs = kue.createQueue();//need redis credentials?
  var mongoose = require('mongoose');
  var express = require('express');
  var router = express.Router();
  var request = require('request');
  var Startup = require('../models/startups');
  var organizationEndpoint = require('./api.js');
  var startupAPI = require('./seeds');





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
var seedHelper = (function(){
  var shuffle_array = function(array) {  // no longer used
    var counter = array.length, 
    temp, 
    index;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        counter--;

        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    };

    return {
      startSeed: function(){
        mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
          console.log("connection started")
        });

        console.log("starting 'find' operation (this may take a while)");

        Startup.where('description').exists(false).exec(function(err, data){
          var i = 0,
          startups = data;
          // startups = shuffle_array(data);
          if (err) {console.log(err); }

          console.log("beginning seed");

          setInterval(function (){
            if (i>startups.length){ return console.log("All records have been updated");}
              console.log('processing number ' + i);
            startupAPI.updateStartup(startups[i]);
            i++;
            if (new Date().getHours == 9 && new Date().getMinutes == 58) {
              process.exit(0); // This is used to restart web worker at a set interval while these background jobs are running. Will crash worker and restart it.
            }
          }, 36000);
        });
      }
    };   
  })();

  module.exports = seedHelper;
