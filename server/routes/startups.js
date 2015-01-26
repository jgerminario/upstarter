var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');
var startupAPI = require('../helpers/seeds');
var organizationEndpoint = require('../helpers/api');

/////////////////////////////////
/// endpoints for our client ///
///////////////////////////////


// GET list of all company names //

router.get('/test-seed/:pageNum', function(req, res) {
  organizationEndpoint.fetchStartups(req.params.pageNum)
})

router.get('/', function(req, res) {

  var query = Startup.find({}).select('name slug -_id');

  var jsonResponse = [];

  query.exec(function (err, data) {
    if (err) { console.log(err) }

    data.forEach(function(startup) {

      var startupObject = {}
      startupObject.name = startup.name
      startupObject.slug = startup.slug.substring(13)
      jsonResponse.push(startupObject)
    })
  res.json(jsonResponse)
  })
})


/* GET users listing. */
router.get('/cb', function(req, res) {
   startupAPI.updateStartup();
});



// GET individual company listing //

router.get('/:slug', function(req, res) { // lotus-development-corporation

  var orgSlug  = 'organization/' + req.params.slug
  var query = Startup.find( { slug: orgSlug } )

  query.exec(function (err, data) {
    if (err) { console.log(err) }
    if (data[0].description) {
      console.log("has description")
      res.json(data)
    }
    else {
      console.log("doesnt have descipriont")
      organizationEndpoint.sendCBRequest(data[0].id, data[0].slug)
      var query = Startup.find( { slug: orgSlug } )
      query.exec(function (err, data) {
        if (err) { console.log(err) }
        res.json(data)
      }) // check
    }
  })
})


// router.get('/initial-seed', function(req, res) {
//   request('https://api.crunchbase.com/v/2/organizations?organization_types=company&user_key=2c7e457b872b77f865562e75967f76ef&page=1&order=created_at+DESC', function (error, response, body) {
//     // console.log(JSON.parse(body))
//       if (!error && response.statusCode == 200) {
//         var items = JSON.parse(body).data.items
//         var counter = 0
//         for (var i=0; i<items.length; i++) {

//           var newEntry = new Startup({
//             slug: items[i].path,
//             name: items[i].name
//           })
//           newEntry.save(function(err) {
//             if (!err) {
//               console.log(counter, 'success')
//               counter += 1
//             } else {
//               // console.log('fail')
//             }
//           });
//         }
//       res.send(JSON.parse(body));
//       }
//    })
// })

module.exports = router;
