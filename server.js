var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usersData = {userCount:0, users:[]};

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
		userData = userData.toLowerCase().replace(/\s/g, "");
		if(!isADuplicate(userData)) {
			usersData.userCount++;
			console.log('logginIn', userData);
			socket.user = userData;
			usersData.users.push(userData);
			socket.emit('loggedIn', {msg: userData, users: usersData});
			io.emit('botMessage', {msg: this.user+" has entered the chat", users: usersData});
			setTimer(this);
		} else {
			this.emit('chooseDiffName');
		}
		//console.log('timer', this.timer);
	})

	socket.on('logout', function() {
		disconnectUser(this);
		io.emit('botMessage', {msg: this.user+" has left the chat",  users: usersData});
		clearTimer(this.timer);
	})

	socket.on('chat message', function(msg){
		if(this.user==null) {
			socket.emit('fakeLog');
		}
		console.log(this.user);
		io.emit('chat message', {msg: this.user+": "+ msg});
		refreshTimer(this);
		//console.log(this.timer);
	});

	socket.on('disconnect', function(){
		if(this.user) {
			console.log('user disconnected', this.user);
			removeUser(this);
			io.emit('botMessage', {msg: this.user+" has disconnected the chat", users: usersData});
			clearTimer(this.timer);
		}
	});
});

function isADuplicate(name) {
	if (isUserThere(name) > -1) {
		return true;
	}
	return false;
}

function isUserThere(name) {
	return usersData.users.indexOf(name);
}

function removeUser(socket) {
	var index = isUserThere(socket.user);
	if (index > -1) {
		usersData.users.splice(index, 1);
		usersData.userCount--;
	}
}

function disconnectUser(socket) {
	socket.emit('loggedOut', {users: usersData});
	socket.disconnect('unauthorized');
	removeUser(socket);
}

function kickUser(socket) {
	disconnectUser(socket);
	io.emit('botMessage', {msg: socket.user+" has been pushed out of the chat", people: usersData});
}

function refreshTimer(socket) {
	clearTimer(socket.timer);
	setTimer(socket);
}

function setTimer(socket) {
	socket.timer = setTimeout(function() {
		console.log(socket);
		kickUser(socket);
		console.log('kicked out due to inactivity');
	}, 300000);
	console.log(socket.timer);
}

function clearTimer(timer) {
	if(timer) {
		clearTimeout(timer);
	}
}

http.listen(8080, function(){
  console.log('listening on *:8080');
});