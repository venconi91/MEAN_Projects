var mongoose = require('mongoose');


var tweetSchema = new mongoose.Schema({
	content: String,
	author_id: String,
	created_at: { type: Date, default: Date.now}
})

var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	fullName: String,
	created_at: { type: Date, default: Date.now}//,
	//tweets: [tweetSchema]
})

var followersSchema = new mongoose.Schema({
	user_id: String,
	followers: [userSchema]
})

var followingsSchema = new mongoose.Schema({
	user_id: String,
	followings: [userSchema]
})


mongoose.model('User', userSchema);
mongoose.model('Tweet', tweetSchema);
mongoose.model('Followers', followersSchema);
mongoose.model('Followings', followingsSchema);