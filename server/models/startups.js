var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;


startupsSchema = new Schema({
  name: { type: String, required: true},
  slug: { type: String, required: true, unique: true },
  short_description: String,
  founded_on: String,
  acquired: Boolean,
  closed: Boolean,
  public: Boolean,
  homepage_url: String,
  description: String,
  total_funding_usd: Number,
  number_of_investments: Number,
  headquarters: Array,
  offices: Array,
  categories: Array,
  founders: Array,
  primary_image: Array,
  websites: Array,
  funding_rounds: Array,
  number_of_employees: Number,
  fiveYearRate: Number,
  threeYearRate: Number,
  twoYearRate: Number,
  oneYearRate: Number,
  momentumScore: Number,
  geo: {type: [Number], index: '2d'},
  fundraisePercentile: { type: Number, default: 0 }
});

// startupsSchema.statics.calculateFundraiseRate = function(fundraiseRounds, years) {
//   // TODO: Check that this works as a hook for new startups created
//       if (err) { console.log(err) }
//       var fundraiseArray = [];
//       var total = 0;
//       var totalRate = 0;
//       var d = new Date();
//       d.setYear(d.getYear()-years);
//       fundraiseRounds.forEach(function(round){
//         if (round.date >= d){
//           fundraiseArray.push(round.amount);
//         }
//       });
//       fundraiseArray.forEach(function(amount){
//         total += amount
//       })
//       totalRate = total/years
//       return totalRate;
// };



startupsSchema.statics.resetHeadquartersOffice = function () {
    this.find().where('headquarters').exists(false).exec(function(err, data){
      data.forEach(function(company){
        console.log("company " + company.name + " headquarters " + company.headquarters);
        company.headquarters = [];
        company.save(function(err, data){
          if (err) { console.log(err); }
          console.log(company.name + " saved");
        });
      });
    });
    this.find().where('offices').exists(false).exec(function(err, data){
        data.forEach(function(company){
        console.log("company " + company.name + " headquarters " + company.offices);
        company.offices = [];
        company.save(function(err, data){
          if (err) { console.log(err); }
          console.log(company.name + " saved");
        });
      });
    });
  };


startupsSchema.statics.resetGeo = function () {
    this.find().exec(function(err, data){
      data.forEach(function(company){
        console.log("Lon, lat for " + company.name + ": " + company.longitude + ", " + company.latitude);
        if (company.offices[0]){
          if (company.offices[0].longitude){
          company.geo = [company.offices[0].longitude, company.offices[0].latitude];
          }
        }
        if (company.headquarters[0]){
          if (company.headquarters[0].longitude){
            company.geo = [company.headquarters[0].longitude, company.headquarters[0].latitude];
          }
        }
        company.save(function(err, data){
          if (err) { console.log(err); }
          console.log("New for " +company.name + " " + company.geo);
        });
      });
    });
};


startupsSchema.statics.resetFundraisePercentile = function () {
    this.find().exec(function(err, data){
      data.forEach(function(company){
        company.fundraisePercentile = 0;
        company.save(function(err, data){
          if (err) { console.log(err); }
          console.log(company.name + " " + company.fundraisePercentile)
        });
      });
    });
};

startupsSchema.statics.individualFundraisePercentile = function(id, callback){
  var self = this;
  this.findById(id).exec(function(error, startup){
    if(error) {console.log(error); }
      self.find().where({ 'acquired': false, 'public': false, 'closed': false, momentumScore: {$gt: 0} }).count(function(e, count){
        if (e) {console.log(e);}
        console.log(count);
        self.find({momentumScore: {$gt: startup.momentumScore}}).count(function(err, index){
          console.log(index);
          if (err) {console.log(err);}
          // console.log(Math.round((count-index) / (count+1) * 100 ));
          startup.fundraisePercentile = Math.round( (count-index) / (count+1) * 100 );
          startup.save(function(error, startup){
            console.log(startup.momentumScore, startup.fundraisePercentile);
            if (error) {console.log(error);}
            callback(startup);
          });
        }); // This is the number of documents with a higher user_count
      });
  });
};

startupsSchema.statics.calculateFundraisePercentile = function () {
  // console.log(Startup.find().exec(function(err,docs){
  //   console.log(docs);
  // }));

  // this.where({ 'acquired': false, 'public': false, 'closed': false, momentumScore: {$gt: 0} }).count().exec(function(err,count){
    // console.log("test3")
    console.log("finding startups (this could take a moment)");
    this.find().where({ 'acquired': false, 'public': false, 'closed': false, momentumScore: {$gt: 0} }).sort([['momentumScore', 'ascending']]).exec(function(err, docs){
      var count = docs.length;
      docs.forEach(function(company, index){
          company.fundraisePercentile = Math.round((index+1)/(count+1) * 100);
        company.save(function(err, data){
          if (err) { return console.log(err); }
          console.log(index + " " + company.name + " " + company.momentumScore + " " + company.fundraisePercentile);
        });
    });
  });
};



startupsSchema.statics.calculateFundraiseRate = function (fundraisingRounds, years) {
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
    total += parseInt(amount);
  });
  totalRate = total;
  return totalRate;
};

startupsSchema.statics.resetFundraiseRates = function () {
    var self = this;
    this.find().where({funding_rounds: {$not: {$size: 0}}}).exec(function(err, data){
      data.forEach(function(company){
        console.log("Before: " + company.name + " 1. " + company.oneYearRate + " 2. " + company.twoYearRate + " 3. " + company.threeYearRate);
        // console.log(company.funding_rounds);
        if (company.funding_rounds){
          company.threeYearRate = self.calculateFundraiseRate(company.funding_rounds, 3);
           company.fiveYearRate = self.calculateFundraiseRate(company.funding_rounds, 5);
           company.oneYearRate = self.calculateFundraiseRate(company.funding_rounds, 1);
           company.twoYearRate = undefined;
         }
         else {
            company.fiveYearRate = 0;
            company.threeYearRate = 0;
            company.twoYearRate = undefined;
            company.oneYearRate = 0;
         }
        company.save(function(err, data){
          if (err) { console.log(err); }
          console.log("After: " + company.name + " 1. " + company.oneYearRate + " 2. " + company.twoYearRate + " 3. " + company.threeYearRate + " 5. " + company.fiveYearRate);
        });
      });
    });
};

startupsSchema.statics.calculateMomentumScore = function(fiveYearRate, threeYearRate, oneYearRate, number_of_employees) {
  if (number_of_employees == 0){
    return 0;
  } else {
  return Math.round((((fiveYearRate-threeYearRate)*0.5 + (threeYearRate-oneYearRate) + oneYearRate * 2))/5/number_of_employees/1000*10)/10; //weighted 5 year average of funding, two decimal points. one year counts for two years, weighted, 2nd and 3rd year for one year each, previous two for half a year each
  }
};

// startupsSchema.methods.findNear = function(distance) {
//   return this.model('startups').find({geo: { $nearSphere: this.geo, $maxDistance: distance }});
// };

// StartupsSchema.pre('save', function (next) {
//   // this.threeYearRate = calculateFundraiseRate(this.funding_rounds, 3);
//   // this.twoYearRate = calculateFundraiseRate(this.funding_rounds, 2);
//   // this.oneYearRate = calculateFundraiseRate(this.funding_rounds, 1);
//   next();
// });

// startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;
