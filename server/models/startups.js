var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;

startupsSchema = new Schema({
	name: { type: String, required: true},
  slug: { type: String, required: true, unique: true },
  fundraiseRate: { type: Number },
  fundraisePercentile: { type: Number }
});

startupsSchema.pre('save', function (next) {
  this.fundraiseRate = calculateFundraiseRate
  this.fundraisePercentile = 0;
  next();
});

startupsSchema.pre('save', calculateFundraiseRate);

startupsSchema.method.calculateFundraiseRate = function (fundraiseRounds) {
  // TODO: Check that this works as a hook for new startups created
    var fundraiseArray = [];
    var total = 0;
    var totalRate = 0;
    var d = new Date();
    d.setYear(d.getYear()-3);
    this.fundraiseRounds.forEach(function(round){
      if (round.date >= d){
        fundraiseArray.push(round.amount);
      }
    });
    fundraiseArray.forEach(function(amount){
      total += amount
    })
    totalRate = total/3
    return totalRate;
};

startupsSchema.statics.calculateFundraisePercentile = function () {

  Startup.count({}, function(err,count){
    Startup.find().sort([['name', 'ascending']]).exec(function(err, docs){
      console.log(docs);
      console.log(count);
      docs.forEach(function(company, index){

      })
      // R/(c+1)*100
    });
  });
};

// startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;