var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema;

startupsSchema = new Schema({
	name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }
})

startupsSchema.plugin(uniqueValidator);

var Startup = mongoose.model('startups', startupsSchema);

module.exports = Startup;