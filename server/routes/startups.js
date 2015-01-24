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


router.get('/initial-seed', function(req, res) {
  request('https://api.crunchbase.com/v/2/organizations?organization_types=company&user_key=2c7e457b872b77f865562e75967f76ef&page=1&order=created_at+DESC', function (error, response, body) {

      if (!error && response.statusCode == 200) {

        var items = JSON.parse(body).data.items
        var counter = 0
        for (var i=0; i<items.length; i++) {

          var newEntry = new Startup({
            slug: items[i].path,
            name: items[i].name
          })
          newEntry.save(function(err) {
            if (!err) {
              console.log(counter, 'success')
              counter += 1
            } else {
              console.log('fail')
            }
          })
        }
      }
   })
})

module.exports = router;
