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
  offices: Array,
  categories: Array,
  founders: Array,
  primary_image: Array,
  websites: Array,
  funding_rounds: Array,
  number_of_employees: Number,
  threeYearRate: Number,
  twoYearRate: Number,
  oneYearRate: Number,
  momentumScore: Number,
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


startupsSchema.statics.calculateFundraisePercentile = function () {
  // console.log(Startup.find().exec(function(err,docs){
  //   console.log(docs);
  // }));

  Startup.count({}, function(err,count){
    Startup.find().sort([['momentumScore', 'ascending']]).exec(function(err, docs){
      // console.log(docs);
      // console.log(count);
      docs.forEach(function(company, index){
        company.fundraisePercentile = (index+1)/(count+1) * 100
        company.save(function(err){
          if (err) {
            return "error saving " + company.name
          }
        })
      })
      // R/(c+1)*100
    });
  });
};

// startupsSchema.pre('save', function (next) {
//   // this.threeYearRate = calculateFundraiseRate(this.funding_rounds, 3);
//   // this.twoYearRate = calculateFundraiseRate(this.funding_rounds, 2);
//   // this.oneYearRate = calculateFundraiseRate(this.funding_rounds, 1);
//   next();
// });

// startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;
