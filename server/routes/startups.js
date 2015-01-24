var express = require('express');
var router = express.Router();
var request = require('request')
var Startup = require('../models/startups')

/* GET users listing. */
router.get('/', function(req, res) {
 	request('https://api.crunchbase.com/v/2/organization/crowdtilt?user_key=2c7e457b872b77f865562e75967f76ef', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var name = JSON.parse(body).data.properties.name
            var newStartup = new Startup({
               name: name
            })
            newStartup.save(function(err){
              if (!err) {
                console.log('success')
              } else {
                console.log('fail')
            }
            res.send(newStartup)
          })
        }
    })
});

module.exports = router;
