var mongoose = require('mongoose');


var tweetSchema = new mongoose.Schema({
	content: String,
	author_id: String,
	hashTags: { type : Array , "default" : [] },
	created_at: { type: Date, default: Date.now}
})

var userSchema = new mongoose.Schema({
	username: {type: String, unique: false},
	password: String,
	fullName: String,
	avatarUrl: String,
	tweets: [tweetSchema],
	created_at: { type: Date, default: Date.now}
})

// followers of the user 
var followersSchema = new mongoose.Schema({
	user_id: String,
	followers: [userSchema]
})


// followings of the user 
var followingsSchema = new mongoose.Schema({
	user_id: String,
	followings: [userSchema]
})


mongoose.model('User', userSchema);
mongoose.model('Tweet', tweetSchema);
mongoose.model('Followers', followersSchema);
mongoose.model('Followings', followingsSchema);