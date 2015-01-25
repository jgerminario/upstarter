var express = require('express'),
  router = express.Router(),
  Startup = require('../models/startups'),
  boot = require('../bin/www').boot,
  shutdown = require('../bin/www').shutdown,
  port = require('../bin/www').port,
  request = require('request'),
  nock = require('nock'),
  // expect = require('expect.js');
  expect = require('chai').expect,
  startupTest = require('./test.json'),
  api = nock("https://api.crunchbase.com/v/2")
      // .filteringPath(function(path){
      //   return '/';
      // })
      .get("/organization/robin?user_key=2c7e457b872b77f865562e75967f76ef")
      .reply(200, startupTest);


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
       request('https://api.crunchbase.com/v/2/organization/robin?user_key=2c7e457b872b77f865562e75967f76ef', function(err, res, body){
        console.log(body);
      });

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
        .get('http://localhost:' + port + '/startups') 
        .on('response', function(response){
          expect(response.body).to.equal("test");
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
        .get('http://localhost:' + port + '/startups/initial-seed') 
        .on('response', function(response){
          expect(response.status).to.equal(200);
          done();
        })
        .on('error', function(err){
          console.log(err);
        });
      });
    });
  });