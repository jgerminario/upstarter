var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var organizationEndpoint = require('./api.js');
var startupAPI = require('./seeds');

mongoose.connect('mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter');

// Startup.resetFundraisePercentile();
Startup.calculateFundraisePercentile();