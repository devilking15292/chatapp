var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/lib", express.static(__dirname + '/lib'));
app.use("/app", express.static(__dirname + '/app'));

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    socket.emit('chat message', msg);
	//socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});