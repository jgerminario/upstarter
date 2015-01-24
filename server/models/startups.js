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
  this.fundraiseRate = 0;
  this.fundraisePercentile = 0;
  next();
});

// startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;