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
}

startupsSchema.statics.calculateFundraisePercentile = function () {
  // console.log(Startup.find().exec(function(err,docs){
  //   console.log(docs);
  // }));

  // this.where({ 'acquired': false, 'public': false, 'closed': false, momentumScore: {$gt: 0} }).count().exec(function(err,count){
    // console.log("test3")
    this.find().where({ 'acquired': false, 'public': false, 'closed': false, momentumScore: {$gt: 0} }).sort([['momentumScore', 'ascending']]).exec(function(err, docs){
      // console.log("test2")
      var count = docs.length
      // console.log(docs);
      // console.log(count);
      docs.forEach(function(company, index){
        // if (company.closed || company.acquired || company.public || company.momentumScore == 0 || company.momentumScore == null) {
        //   console.log(company.fundraisePercentile)
        //   company.fundraisePercentile = 0;
        // } else {
          company.fundraisePercentile = (index+1)/(count+1) * 100;
        // }
        console.log(index + " " + company.name + " " + company.momentumScore + " " + company.fundraisePercentile)
        company.save(function(err, data){
          if (err) {
            return "error saving " + company.name
          }
          // console.log(data);
        });
      // R/(c+1)*100
    });
  });
};

// StartupsSchema.pre('save', function (next) {
//   // this.threeYearRate = calculateFundraiseRate(this.funding_rounds, 3);
//   // this.twoYearRate = calculateFundraiseRate(this.funding_rounds, 2);
//   // this.oneYearRate = calculateFundraiseRate(this.funding_rounds, 1);
//   next();
// });

// startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;
