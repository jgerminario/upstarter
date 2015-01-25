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
  api = nock("https://api.crunchbase.com")
      .filteringPath(function(path){
        return '/v/2/organization';
      })
      .get("/v/2/organization") //this needs to be the route - base url must be in the nock param
      .reply(200, startupTest);


describe('server', function () {

  before(function () {
   boot();
  });

  after(function () {
   shutdown();
  });
// var expect = require('chai').expect;



  // describe('homepage', function(){
  //   it('should respond to GET',function(done){
  //     request
  //       .get('http://localhost:' + port) 
  //       .on('response', function(response){
  //         expect(response.statusCode).to.equal(200);
  //         done();
  //       })
  //       .on('error', function(err){
  //         console.log(err);
  //       });
  //     });
  //   });

  describe('startup endpoint', function(){
    it('should respond to GET',function(done){
      request
        .get('http://localhost:' + port + '/startups') 
        .on('response', function(response){
          expect(response).to.be.an('object');
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
      console.log('test');
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