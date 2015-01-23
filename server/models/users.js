var mongoose = require('mongoose');
var Schema = mongoose.Schema;

usersSchema = new Schema({
	name: String,
	email: String
})

var User = mongoose.model('users', usersSchema)

module.exports = User;