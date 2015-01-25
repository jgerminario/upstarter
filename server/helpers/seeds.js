
var express = require('express');
var router = express.Router();
var request = require('request')
var Startup = require('../models/startups');


var getAllStartups = function (){
  Startup.find(function(err, startups){
    var count = startups.length;
    // console.log(count);
    // var rand_num = Math.floor(Math.random() * count);
    // var startup_to_update = startups[371];
    // console.log(startup_to_update);
    Startup.findById("54c3fe2f98a0ee617841ef35", function(err, startup_to_update){
      console.log(startup_to_update);
    while (startup_to_update.description){
      console.log("Test");
      var rand_num = Math.floor(Math.random() * count);
      startup_to_update = startups[rand_num];
    }
      console.log(rand_num);
      console.log(startup_to_update);
      Startup.findById(startup_to_update.id, function(err, startup){
        startup.description = "test";
        startup.save(function(err, data){
          console.log(err);
          console.log(data);
          console.log(startup);
        startup.description = undefined;
        console.log(startup);
        });
      });
      // console.log(startup_to_update.id)
      // Startup.update({ _id: startup_to_update.id}, { $set: { description: "test"}}, function(err, data){
      // });
      //   console.log(data);
      //   console.log(startup_to_update);
      //   Startup.update({ _id: startup_to_update.id}, { $unset: { description: 1}}, function(err, data){
      //     console.log(data);
      //     console.log(startup_to_update);
      //   Startup.update({});
      //   });
    // });
  // });

});
});
};
module.exports = getAllStartups;