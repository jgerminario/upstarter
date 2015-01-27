var express = require('express'),
router = express.Router(),
Startup = require('../models/startups'),
boot = require('../bin/www').boot,
shutdown = require('../bin/www').shutdown,
port = require('../bin/www').port,
request = require('request'),
nock = require('nock'),
  // expect = require('expect.js');
  expect = require('chai').expect, // http://chaijs.com/api/bdd/
  startupTest = require('./test.json'),
  startupsTest = require('./test_multi.json'),
  single_api = nock("https://api.crunchbase.com")
  .filteringPath(function(path){
    return '/v/2/organization';
  })
      // .persist() // if needed multiple times
      .get("/v/2/organization") //this needs to be the route - base url must be in the nock param
      .reply(200, startupTest),
      multi_api = nock("https://api.crunchbase.com")
      .filteringPath(function(path){
        return '/v/2/organizations';
      })
      .get("/v/2/organizations") //this needs to be the route - base url must be in the nock param
      .reply(200, startupsTest);


