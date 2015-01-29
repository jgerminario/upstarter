var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/connections/:userId', function(req, res) {
  User.findOne({'linkedin.id':req.params.userId}, function(err, user){
    if (err) {
      throw err
    } else {
      request('https://api.linkedin.com/v1/people/~/connections:(first-name,last-name,industry,picture-url,positions,public-profile-url)?format=json&oauth2_access_token='+user.token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body)
        }
      })
    }
  });
  // console.log(accessToken)
});

module.exports = router;
