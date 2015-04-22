var express = require("express");
var app = express();
var port = 3030;

app.get("/", function(req,res){
	res.send("HI man")
})

app.post("/CreateToDo",function(req,res){
	// save todo into database
})

app.get("/ToDos",function(req,res){
	// send todos from database to client
})

app.get("*",function(req,res){
	res.sendfile("public/index.html");
})

app.listen(port);
console.log("app listen on port:" + port)