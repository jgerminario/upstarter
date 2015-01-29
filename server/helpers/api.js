var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');


var organizationEndpoint = (function (){



  var saveStartupPage = function(error, response, body) {
    if (error) { console.log(error); }
    if (response.statusCode != 200) { console.log(response.body); }
    if (!error && response.statusCode == 200) {
      var items = JSON.parse(body).data.items;
      console.log(items.length);
      var counter = 0;
      for (var i=0; i<items.length; i++) {

        var newEntry = new Startup({
          slug: items[i].path,
          name: items[i].name
        });
        // console.log(newEntry)
        newEntry.save(function(err, data) {
          if (!err) {
            console.log(counter + ' success');
            counter += 1;
          } else {
            console.log(err);
            counter +=1;
          }
        });
      }
    }
  }


  var parseFields = function (id, error, response, body, res){
    if (error) { return console.log(error) }
      if (response.statusCode != 200) { return console.log(response.body); }
        if (!error && response.statusCode == 200 && JSON.parse(body).data.properties) {
          var json_body, name, path, closed, acquired, public, founded_on, homepage_url,short_description, description, total_funding_usd, number_of_investments, number_of_employees, officesArray, offices,headquarters, categories, primary_image, websites, founders, fundraiseRounds, geo;
          json_body = JSON.parse(body).data;
          // console.log(json_body)
          name = json_body.properties.name
          path = 'organization/' + json_body.properties.permalink
          if (json_body.properties.closed_on != null || json_body.properties.is_closed == true){
            closed = true;
          }
          if (json_body.relationships.acquired_by != null){
            acquired = true;
          }
          if (json_body.properties.stock_symbol != null || json_body.relationships.ipo != null){
            public = true;
          } 
          founded_on = json_body.properties.founded_on
          homepage_url = json_body.properties.homepage_url
          short_description = json_body.properties.short_description
          description = json_body.properties.description
          total_funding_usd = json_body.properties.total_funding_usd
          number_of_investments = json_body.properties.number_of_investments
          if (json_body.relationships.offices){
            var officesArray = json_body.relationships.offices.items
            offices = []
            officesArray.forEach(function(office){
              offices.push({street_1: office.street_1, street_2: office.street_2, postal_code: office.postal_code, city: office.city, region: office.region, country: office.country, latitude: office.latitude, longitude: office.longitude});
            if (offices[0].longitude){
              geo = [offices[0].longitude,offices[0].latitude];
              }
            });
          }
          if (json_body.relationships.headquarters){
            var headquarter = json_body.relationships.headquarters.items[0]
            headquarters = [{street_1: headquarter.street_1, street_2: headquarter.street_2, postal_code: headquarter.postal_code, city: headquarter.city, region: headquarter.region, country: headquarter.country, latitude: headquarter.latitude, longitude: headquarter.longitude}]
            if (headquarters[0].longitude){
            geo = [headquarters[0].longitude,headquarters[0].latitude];
            }
          }
          number_of_employees = json_body.properties.number_of_employees
          if (json_body.relationships.categories){
            var categoriesArray = json_body.relationships.categories.items
            categories = []
            categoriesArray.forEach(function(category){
              categories.push(category.name)
            })
          }
          if (json_body.relationships.primary_image){
            var primaryImageArray = json_body.relationships.primary_image.items
            primary_image = []
            primaryImageArray.forEach(function(image){
              primary_image.push(image.path)
            })
          }
          if (json_body.relationships.websites){
            var websitesArray = json_body.relationships.websites.items
            websites = []
            websitesArray.forEach(function(website){
              websites.push({title: website.title, url: website.url})
            })
          }
          if (json_body.relationships.founders) {
            var foundersArray = json_body.relationships.founders.items
            founders = []
            foundersArray.forEach(function(founder){
              founders.push({name: founder.name, path: founder.path})
            })
          }
          fundraiseRounds = []
          if (json_body.relationships.funding_rounds) {
            var fundraiseArray = json_body.relationships.funding_rounds.items
            fundraiseArray.forEach(function(round){
              if (round.name.match(/\d{4,}/)) {
                fundraiseRounds.push({amount: round.name.match(/\d{4,}/), date: new Date(round.created_at * 1000)})
              }
            });
          }
        



      // function calculateMomentumScore() {
      //   if (number_of_employees == 0){
      //     return 0
      //   } else {
      //   return (calculateFundraiseRate(fundraiseRounds, 3) * 0.5 + calculateFundraiseRate(fundraiseRounds, 2) + calculateFundraiseRate(fundraiseRounds, 1) * 2)/number_of_employees
      //   }
      // }
      var fiveYearRate = Startup.calculateFundraiseRate(fundraiseRounds, 5),
         threeYearRate = Startup.calculateFundraiseRate(fundraiseRounds, 3),
         oneYearRate = Startup.calculateFundraiseRate(fundraiseRounds, 1);

      var attributes = {
        name: name,
        funding_rounds: fundraiseRounds || [],
        slug: path,
        founded_on: founded_on || "",
        acquired: acquired || false,
        closed: closed || false,
        public: public || false,
        homepage_url: homepage_url || "",
        short_description: short_description || "",
        description: description || "",
        total_funding_usd: total_funding_usd || 0,
        number_of_investments: number_of_investments || 0,
        headquarters: headquarters || [],
        offices: offices || [],
        founders: founders || [],
        categories: categories || [],
        primary_image: primary_image || [],
        websites: websites || [],
        number_of_employees: number_of_employees || 0,
        fiveYearRate: fiveYearRate || 0,
        threeYearRate: threeYearRate || 0,
        // twoYearRate: twoYearRate || 0,
        oneYearRate: oneYearRate || 0,
        geo: geo || [],
        momentumScore: Startup.calculateMomentumScore(fiveYearRate, threeYearRate, oneYearRate, number_of_employees) || 0
      };


      Startup.findByIdAndUpdate(id, attributes, function(err, startup){
        if (err) { console.log(err); }
        if (res) {
          res.send(startup);
        }
        console.log("Saving " + startup.name + " as " + startup._id + " with momentum score " + startup.momentumScore + " employees " + startup.number_of_employees + " public: " + startup.public + " acquired: " + startup.acquired + " closed :" + startup.closed + " three year rate: " + startup.threeYearRate + " num of rounds: " +startup.funding_rounds.length + " geo " + startup.geo);
      });
    }
  };

  return {
    sendCBRequest: function(id, permalink, res){
      var user_key = process.env.CB_KEY;
      request('https://api.crunchbase.com/v/2/' + permalink + '?user_key=' + user_key, function(error, response, body){
        parseFields(id, error, response, body, res);
      });
    },

    fetchStartups: function(pageNum) {
      var user_key = process.env.CB_KEY;
      request('https://api.crunchbase.com/v/2/organizations?organization_types=company&user_key=' + user_key + '&page=' + pageNum + '&order=created_at+DESC', function (error, response, body) {
        saveStartupPage(error, response, body)
      })
    }
  };

})();

module.exports = organizationEndpoint;
