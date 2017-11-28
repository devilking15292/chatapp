var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

express.static('lib');
express.static('app');

app.get('/', function(req, res){
	//console.log(req);
  res.sendFile(__dirname + '/index.html');
});

app.use("/lib", express.static(__dirname + '/lib'));
app.use("/app", express.static(__dirname + '/app'));

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});