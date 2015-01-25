var express = require('express');
var router = express.Router();
var request = require('request');
var Startup = require('../models/startups');


var organizationEndpoint = (function (){

  var parseFields = function (res, id, error, response, body){
    // Startup.findById(id, function(err, data){
    //   console.log("DATA HERE")
    //   console.log(data)
    // })
    if (error) { console.log(error) }
    if (response.statusCode == 401) { console.log(response.body) }
    if (!error && response.statusCode == 200) {
      var name = JSON.parse(body).data.properties.name
      var path = 'organization/' + JSON.parse(body).data.properties.permalink
      var founded_on = JSON.parse(body).data.properties.founded_on
      var homepage_url = JSON.parse(body).data.properties.homepage_url
      var short_description = JSON.parse(body).data.properties.short_description
      var description = JSON.parse(body).data.properties.description
      var total_funding_usd = JSON.parse(body).data.properties.total_funding_usd
      var number_of_investments = JSON.parse(body).data.properties.number_of_investments
      var officesArray = JSON.parse(body).data.relationships.offices.items
      var number_of_employees = JSON.parse(body).data.properties.number_of_employees
      var offices = []
      officesArray.forEach(function(office){
        offices.push({street_1: office.street_1, street_2: office.street_2, postal_code: office.postal_code, city: office.city, region: office.region, country: office.country, latitude: office.latitude, longitude: office.longitude})
      })
      var categoriesArray = JSON.parse(body).data.relationships.categories.items
      var categories = []
      categoriesArray.forEach(function(category){
        categories.push(category.name)
      })
      var primaryImageArray = JSON.parse(body).data.relationships.primary_image.items
      var primary_image = []
      primaryImageArray.forEach(function(image){
        primary_image.push(image.path)
      })
      var websitesArray = JSON.parse(body).data.relationships.websites.items
      var websites = []
      websitesArray.forEach(function(website){
        websites.push({title: website.title, url: website.url})
      })
      if (JSON.parse(body).data.relationships.founders) {
        var foundersArray = JSON.parse(body).data.relationships.founders.items
        var founders = []
        foundersArray.forEach(function(founder){
          founders.push({name: founder.name, path: founder.path})
        })
      }
      if (JSON.parse(body).data.relationships.funding_rounds) {
        var fundraiseRounds = []
        var fundraiseArray = JSON.parse(body).data.relationships.funding_rounds.items
        fundraiseArray.forEach(function(round){
          if (round.name.match(/\d{4,}/)) {
            fundraiseRounds.push({amount: round.name.match(/\d{4,}/), date: round.created_at})
          }
        });
      }


      var attributes = {
       name: name,
       funding_rounds: fundraiseRounds,
       slug: path,
       founded_on: founded_on,
       homepage_url: homepage_url,
       short_description: short_description,
       description: description,
       total_funding_usd: total_funding_usd,
       number_of_investments: number_of_investments,
       offices: offices,
       founders: founders,
       categories: categories,
       primary_image: primary_image,
       websites: websites,
       number_of_employees: number_of_employees
     };

     console.log(id);

      Startup.findByIdAndUpdate(id, attributes, function(err, startup){
        console.log("startup is")
        console.log(startup)
        res.send(startup);
      });
      // newStartup.save(function(err){
      //   if (!err) {
      //     console.log('success')
      //   } else {
      //     console.log('fail')
      //   }
      // });
    }
  };

  return {
    sendCBRequest: function(res, id, permalink){
      var user_key = process.env.CB_KEY;
      request('https://api.crunchbase.com/v/2/' + permalink + '?user_key=' + user_key, function(error, response, body){
        parseFields(res, id, error, response, body);
      });
    }
  };

})();

module.exports = organizationEndpoint;