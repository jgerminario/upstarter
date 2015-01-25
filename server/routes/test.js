var express = require('express');
var router = express.Router();
var request = require('request')
var Startup = require('../models/startups');
var getAllStartups = require('../helpers/seeds.js');


router.get('/', function(req, res){
  // Startup.calculateFundraisePercentile();
  // var allStartups = Startup.find();
  // allStartups.exec(function(err, startups){
    // res.send(startups);
  // });
  res.send(getAllStartups());
  // console.log("#2")
  // console.log(Startup.find())
})


module.exports = router;
