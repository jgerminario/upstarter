var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({ extended: false });
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var User = require('../models/users');

router.get('/', function(req, res){
  res.send('hi')
})

module.exports = router;
