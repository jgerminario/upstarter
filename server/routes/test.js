var express = require('express');
var router = express.Router();
var request = require('request')
var Startup = require('../models/startups');


router.get('/', function(req, res){
  Startup.calculateFundraisePercentile();
})



module.exports = router;
