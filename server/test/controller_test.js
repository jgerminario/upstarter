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


describe('server', function () {

  before(function () {
   boot();
  });

  after(function () {
   shutdown();
  });
// var expect = require('chai').expect;



  describe('homepage', function(){
    it('should respond to GET',function(done){
      request
        .get('http://localhost:' + port) 
        .on('response', function(response){
          expect(response.statusCode).to.equal(200);
          done();
        })
        .on('error', function(err){
          console.log(err);
        });
      });
    });

  describe('startup endpoint', function(){
    it('should respond to GET',function(done){
      request
        .get('http://localhost:' + port + '/startups') // function(error, response, body) is alternative, this seems more robust but also harder to get data out
        .on('data', function(data){
          console.log(data.toString()); // shows what data comes in asynchronously
        })
        .on('response', function(response){
          expect(response.statusCode).to.equal(200); // response has no body in this case, need to gather from data above to get full body
          done();
        })
        .on('error', function(err){
          console.log(err);
        });
      // assert.ok(true);
      // assert.equal(result, 'bar');
      });
    });

  describe('startup endpoint', function(){
    it('should respond to GET',function(done){
      request
        .get('http://localhost:' + port + '/startups/initial-seed') 
        .on('response', function(response){
          expect(response.statusCode).to.equal(200);
          done();
        })
        .on('error', function(err){
          console.log(err);
        });
      });
    });
  });