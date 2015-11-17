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
	
	socket.on("chat message", function(msg){
		console.log(msg)
		io.emit("chat message", msg)
	})
})