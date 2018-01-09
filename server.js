var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userCount = 0;
var usersData = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use("/lib", express.static(__dirname + '/lib'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/style", express.static(__dirname + '/style'));

io.on('connection', function(socket){
	
  console.log('user connected');
  socket.user = null;
  
  socket.on('login', function(userData) {
	usersData.userCount++;
	console.log('logginIn', userData);
	socket.user = userData;
	socket.emit('loggedIn', userData);
	io.emit('botMessage', this.user+" has entered the chat");
	//setTimer(this);
	//console.log('timer', this.timer);
  })
  
  socket.on('logout', function() {
	socket.emit('loggedOut');
	socket.disconnect('unauthorized');
	io.emit('botMessage', this.user+" has left the chat");
	//clearTimer(this.timer);
	usersData.userCount--;
  })
  
  socket.on('chat message', function(msg){
	if(this.user==null) {
		socket.emit('fakeLog');
	}
	console.log(this.user);
    io.emit('chat message', this.user+": "+ msg);
	//refreshTimer(this);
	//console.log(this.timer);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected', this.user);
	io.emit('botMessage', this.user+" has left the chat");
	if(this.timer) {
		clearTimer(this.timer);
	}
  });
  
});

function refreshTimer(socket) {
	clearTimer(socket.timer);
	setTimer(socket);
}

function setTimer(socket) {
	var sock = socket;
	socket.timer = setTimeout(function(sock) {
		console.log(sock);
		sock.disconnect('unauthorized');
		sock.emit('loggedOut');
		io.emit('botMessage', sock.user+" has been pushed out of the chat");
		console.log('kicked out due to inactivity');
	}, 3000);
	console.log(sock.timer);
}

function clearTimer(timer) {
	clearTimeout(timer);
}

http.listen(8080, function(){
  console.log('listening on *:8080');
});