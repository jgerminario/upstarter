var mongoose = require('mongoose');
var Schema = mongoose.Schema;

startupsSchema = new Schema({
	name: String
})

var Startup = mongoose.model('startups', startupsSchema)

module.exports = Startup;