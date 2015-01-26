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
    if (error) { console.log(error) }
      if (response.statusCode != 200) { console.log(response.body) }
        if (!error && response.statusCode == 200) {
          var json_body = JSON.parse(body).data;
          console.log(json_body)
          var name = json_body.properties.name
          var path = 'organization/' + json_body.properties.permalink
          if (json_body.properties.closed_on != null || json_body.properties.is_closed == true){
            var closed = true;
          }
          if (json_body.relationships.acquired_by != null){
            var acquired = true;
          }
          if (json_body.properties.stock_symbol != null || json_body.relationships.ipo != null){
            var public = true;
          } 
          var founded_on = json_body.properties.founded_on
          var homepage_url = json_body.properties.homepage_url
          var short_description = json_body.properties.short_description
          var description = json_body.properties.description
          var total_funding_usd = json_body.properties.total_funding_usd
          var number_of_investments = json_body.properties.number_of_investments
          if (json_body.relationships.offices){
            var officesArray = json_body.relationships.offices.items
            var offices = []
            officesArray.forEach(function(office){
              offices.push({street_1: office.street_1, street_2: office.street_2, postal_code: office.postal_code, city: office.city, region: office.region, country: office.country, latitude: office.latitude, longitude: office.longitude})
            })
          }
          if (json_body.relationships.headquarters){
            var headquarter = json_body.relationships.headquarters.items[0]
            var headquarters = [{street_1: headquarter.street_1, street_2: headquarter.street_2, postal_code: headquarter.postal_code, city: headquarter.city, region: headquarter.region, country: headquarter.country, latitude: headquarter.latitude, longitude: headquarter.longitude}]
          }
          var number_of_employees = json_body.properties.number_of_employees
          if (json_body.relationships.categories){
            var categoriesArray = json_body.relationships.categories.items
            var categories = []
            categoriesArray.forEach(function(category){
              categories.push(category.name)
            })
          }
          if (json_body.relationships.primary_image){
            var primaryImageArray = json_body.relationships.primary_image.items
            var primary_image = []
            primaryImageArray.forEach(function(image){
              primary_image.push(image.path)
            })
          }
          if (json_body.relationships.websites){
            var websitesArray = json_body.relationships.websites.items
            var websites = []
            websitesArray.forEach(function(website){
              websites.push({title: website.title, url: website.url})
            })
          }
          if (json_body.relationships.founders) {
            var foundersArray = json_body.relationships.founders.items
            var founders = []
            foundersArray.forEach(function(founder){
              founders.push({name: founder.name, path: founder.path})
            })
          }
          var fundraiseRounds = []
          if (json_body.relationships.funding_rounds) {
            var fundraiseArray = json_body.relationships.funding_rounds.items
            fundraiseArray.forEach(function(round){
              if (round.name.match(/\d{4,}/)) {
                fundraiseRounds.push({amount: round.name.match(/\d{4,}/), date: new Date(round.created_at * 1000)})
              }
            });
          }

        function calculateFundraiseRate(fundraisingRounds, years) {
        // TODO: Check that this works as a hook for new startups created
        var fundraiseArray = [];
        var total = 0;
        var totalRate = 0;
        var d = new Date();
        d.setYear(d.getFullYear()-years);
        fundraisingRounds.forEach(function(round){
          if (round.date >= d){
            fundraiseArray.push(round.amount[0]);
          }
        });
        fundraiseArray.forEach(function(amount){
          total += parseInt(amount)
        })
        totalRate = total/years
        return totalRate;
      };

      function calculateMomentumScore() {
        if (number_of_employees == 0){
          return 0
        } else {
        return (calculateFundraiseRate(fundraiseRounds, 3) * 0.5 + calculateFundraiseRate(fundraiseRounds, 2) + calculateFundraiseRate(fundraiseRounds, 1) * 2)/number_of_employees
        }
      }

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
        threeYearRate: calculateFundraiseRate(fundraiseRounds, 3) || 0,
        twoYearRate: calculateFundraiseRate(fundraiseRounds, 2) || 0,
        oneYearRate: calculateFundraiseRate(fundraiseRounds, 1) || 0,
        momentumScore: calculateMomentumScore() || 0
      };


      Startup.findByIdAndUpdate(id, attributes, function(err, startup){
        if (err) { console.log(err); }
        if (res) {
          res.send(startup);
        }
        console.log(startup);
        console.log(startup._id);
      });
    }
  };

  return {
    sendCBRequest: function(id, permalink){
      var user_key = process.env.CB_KEY;
      request('https://api.crunchbase.com/v/2/' + permalink + '?user_key=' + user_key, function(error, response, body){
        parseFields(id, error, response, body);
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
