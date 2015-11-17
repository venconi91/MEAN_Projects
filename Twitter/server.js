var express = require('express');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
require('./models/models.js');
mongoose.connect('mongodb://localhost/twitter');
var port = 3000;

var app = express();
app.set('view engine', 'jade');
app.set("views", __dirname + "/views")
app.use(express.static(__dirname + "/public"))
app.use(session({
  secret: 'unresolved password secred'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


var Tweet = mongoose.model('Tweet');
var Followers = mongoose.model('Followers');
var Followings = mongoose.model('Followings');
var User = mongoose.model('User');




app.get('/info', function(req, res) {
  res.send('info page');
});

app.get('/success', function(req, res){
    // add user to followers and followings
    res.send({state: 'success', user: req.user ? req.user.username : null});
});

    //sends failure login state back to angular
app.get('/failure', function(req, res){
    res.send({state: 'failure', user: null, message: "Invalid username or password"});
});

app.get('/login',function(req,res){
    res.render("login");
})

app.post('/login', passport.authenticate('login', {
        successRedirect: '/success',
        failureRedirect: '/failure'
}));


app.get('/register', function(req,res){
    res.render("register");
});


app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));

app.get('/signout', function(req, res) {
	req.session.destroy(function(err){
        res.redirect('/#/login');    
    });
});

app.get('/home',isAuthenticated, function(req,res){
    // get all users tweets
    var currentUserId = req.user._id;

    
    
    var currentUserId = req.user._id;
    Followings.findOne({"user_id": currentUserId}, function(err, userFollowers){
        if (err) {
            console.log(err);
        };
        console.log("whole object" + userFollowers)
        // if (userFollowers.followings) {
        //     //console.log(userFollowers.followings);
        // };

        res.render("home", {"userFollowers": userFollowers});        
    })
    
});

app.get('/partials/courses/javascript',function(req,res){
	console.log(req.params[courseName])
	console.log(req.params.courseName)
	res.render('coursesJade')
})

app.get('/test', isAuthenticated ,function(req,res){
    console.log("req.user: " + JSON.stringify(req.user));

    res.render('test')

})

app.post('/createTweet', isAuthenticated, function(req,res){
    var tweet = new Tweet();
    var content = req.body.tweetContent;
    tweet.content = content;
    var hashTags = content.match(/#[a-zA-Z]+/g);
    tweet.author_id = req.user._id;
    if (hashTags != null) {
        tweet.hashTags = hashTags;
    };
    
    tweet.save(function(err, tweetData) {
            if (err){
                return res.send(404, err);
            }
    });

     var currentUserId = req.user._id;
     User.findOne({"_id": currentUserId},function(err,currentUserFromDb){
        if (err) {
             console.log("finding user error: " + err)
        };

        currentUserFromDb.tweets.push(tweet);
        currentUserFromDb.save(function(err){
            if (err) {
                console.log("saving error: "+ err)
            };

            return res.json(tweet)
        })
    })
})

app.get('/tweets/user/:id',function(req,res){
    var userId = req.param("id");
    
    Tweet.find({"author_id": userId}, function(err, tweets){
        if (err) {
            console.log(err)
        };

        res.json(tweets)
    })
})

app.get('/users',function(req,res){
    User.find({}, function(err, users){
        if (err) {
            console.log("users finding error: " + err)
        };

        res.render("users", {"users": users});
    })
})


app.post('/follow', isAuthenticated, function(req,res){
    var userIdToFollow = req.body.userId;
    //console.log("server post follow: " + userIdToFollow);
    var senderId = req.user._id;
    Followings.findOne({"user_id": senderId}, function(err,data){
        if (err) {
            console.log("error" + err)
            res.status(404).send('cannot find followings');
        };
        if (data === null) {
            var following = new Followings();
            following.user_id = senderId;
            // find other with other id and push
            User.findOne({"_id": userIdToFollow},function(err,userToFollowData){
                if (err) {
                    console.log("cannot find user to follow by id")
                };
                following.followings.push(userToFollowData);
            })

            following.save(function(err, followingData) {
                if (err){
                    return res.send(500, err);
                }
                console.log("createdAll"+following)
                return res.json(following);
            });
        } else{
            var followingUser = data;
            //console.log("finded user: " + followingUser);
            User.findOne({"_id": userIdToFollow},function(err,userToFollow){
                if (err) {
                    console.log("cannot find user to follow by id")
                };
                //console.log("user to follow" + userToFollow);
                followingUser.followings.push(userToFollow);
                followingUser.save(function(err){
                    if (err) {
                        console.log("saving error:"+ err)
                    };
                })
            })

            res.send(followingUser);
        }
    })
})

app.get('/myTweets', isAuthenticated, function(req,res){
    var currentUserId = req.user._id;
    Tweet.find({"author_id" : currentUserId}, function(err, tweets){
        if (err) {
            console.log("tweet finding error: " + err)
        };
        //console.log("tweets:" + JSON.stringify(tweets));

        res.render("myTweets", {"tweets": tweets});
    })
})

app.get('/user/:id', function(req,res){
    var profileId = req.params("id");
    console.log(profileId);
    res.send({"user params": profileId});
})

var initPassport = require('./config/passport.js');
initPassport(passport);


app.get("/", function(req,res){
	res.render('index');
})



function isAuthenticated(req,res,next){
    if (req.isAuthenticated) {
        return next();
    };

    res.render('/#/login');
}


app.listen(port);
console.log("app listen on port: " + port)
