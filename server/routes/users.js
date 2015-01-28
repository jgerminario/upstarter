var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/connections/:accessToken', function(req, res) {
  request('https://api.linkedin.com/v1/people/~/connections?format=json&oauth2_access_token='+req.params.accessToken, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
});

module.exports = router;
