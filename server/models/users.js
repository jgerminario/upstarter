var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var usersSchema = new Schema({
	email: String,
  password: String,
  linkedin: {
    id: String,
    token: String,
    gender: String,
    email: { type: String, unique: true },
    name: String
  }
})

usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var User = mongoose.model('users', usersSchema)

module.exports = User;
