// 'use strict';

var utils = require('./test_utils');

var express = require('express'),
Startup = require('../models/startups'),
  // expect = require('expect.js');
expect = require('chai').expect, // http://chaijs.com/api/bdd/
startupTest = require('./test.json'),
startupsTest = require('./test_multi.json');

before (function(){

});

describe('Startup', function(){
  it('should be able to be created',function(done){
    var startup = {
     name: "Test startup",
     slug: 'organization/test-startup'
    };
    Startup.create(startup, function (err, su) {
     expect(err).to.not.equal(true);
     expect(su.name).to.equal(su.name);
     expect(su.slug).to.equal(su.slug);
     done();
  });
});
});