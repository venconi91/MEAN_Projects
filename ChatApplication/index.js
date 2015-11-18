var port = 3000
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/",function(req, res){
	res.sendFile(__dirname + "/index.html")
})


http.listen(port, function(){
  console.log("listening on : " + port);
});

io.on("connection",function(socket){
	console.log("user connected");
	
	socket.on("chat message", function(obj){
		console.log(socket);
		//socket.broadcast.emit("chat message", { messageText: obj.messageText, author: obj.author })
		io.emit("chat message", { messageText: obj.messageText, author: obj.author })
	})
})