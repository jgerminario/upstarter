var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function(req, res) {

  request('https://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef', function (error, response, body) {
    if (!error && response.statusCode == 200) {
     res.send(body) // Print the google web page.
   }
  })

});

module.exports = router;
