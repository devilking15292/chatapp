(function(angular) {
	angular
		.module("myApp")
		.controller('mainController', controller);
		
	function controller($scope, $state, socketService) {
		$scope.logout = logout;
		$scope.loginName = "";
		
		function logout() {
			socketService.emit('logout');
		}
		
		socketService.on('chat message', function(msg){
		  var span=document.createElement("div");
		  span.appendChild(document.createTextNode(msg));
		  document.getElementById("messages").appendChild(span);
		});
		
		socketService.on('botMessage', function(msg){
		  var span=document.createElement("div");
		  span.appendChild(document.createTextNode(msg));
		  document.getElementById("messages").appendChild(span);
		});
		
		socketService.on('loggedIn', function(msg){
			socketService.user = msg;
			$state.go('chat');
		});
		
		socketService.on('loggedOut', function() {
			socketService.user = null;
			$state.go('login');
		})
		
		socketService.on('fakeLog', function() {
			socketService.user = null;
			alert("sorry but you have to login");
			$state.go('login');
		})
	}
})(angular)