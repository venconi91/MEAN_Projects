var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	fullName: String,
	created_at: { type: Date, default: Date.now}
})

mongoose.model('User', userSchema);