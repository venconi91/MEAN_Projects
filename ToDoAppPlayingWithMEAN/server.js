var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require('body-parser')
var port = 3030;

mongoose.connect('mongodb://localhost:27017/todos');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser())


	
var ToDo = mongoose.model('ToDo', {
		text: String 
	}
);

// creating todo
app.post("/CreateToDo",function(req,res){
	var toDo = new ToDo({ text: req.body.text });
	
	toDo.save(function (err) {
		if (err){
			console.log("error:" + err)
		}
		ToDo.find(function (err, toDos) {
			if (err) {
				console.log(err)
			}
			res.send(toDos)
		})
	});
		
})

// get todos
app.get("/ToDos",function(req,res){
	ToDo.find(function (err, toDos) {
		if (err) {
			console.log(err)
		}
		
		res.send(toDos)
	})
})

app.delete('/todos/:id', function(req, res) {
	ToDo.remove({ _id: req.params.id }, function (err) {
		if (err) {
			console.log(err)
		};
		ToDo.find(function (err, toDos) {
			if (err) {
				console.log(err)
			}
			res.send(toDos)
		})		
	})
});

app.get("*",function(req,res){
	res.sendfile('./public/index.html');
})

app.listen(port);
console.log("app listen on port:" + port)