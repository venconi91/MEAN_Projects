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




app.get('/info', function(req, res) {
  res.send('info page');
});

app.get('/success', function(req, res){
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

app.get('/home', function(req,res){
    res.render("home");
});

app.get('/partials/courses/javascript',function(req,res){
	console.log(req.params[courseName])
	console.log(req.params.courseName)
	res.render('coursesJade')
})

app.get('/test',function(req,res){
	res.render('test')

})

var initPassport = require('./config/passport.js');
initPassport(passport);


app.get("/", function(req,res){
	res.render('index');
})




app.listen(port);
console.log("app listen on port: " + port)