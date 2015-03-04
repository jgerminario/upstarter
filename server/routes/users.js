var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/users');
var jwt = require('jwt-simple');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

// Gets connections based on token received from the initial oAuth call
router.get('/connections/:token', function(req, res) {
  User.findOne({token: req.params.token}, function(err, user){
    if (err) {
      throw err;
    } else if (user) { // Some situations where user isn't found - error handling added
      var decoded = jwt.decode(req.params.token, user.linkedin.id);
      request('https://api.linkedin.com/v1/people/~/connections:(first-name,last-name,industry,picture-url,positions,public-profile-url)?format=json&oauth2_access_token='+decoded.token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body);
        }
      });
    } else {
      res.status(404).send("User not found");
    }
  });
  // console.log(accessToken)
});

module.exports = router;
