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
		
		socketService.on('chat message', function(resp){
			addToView(resp.msg);
		});
		
		socketService.on('botMessage', function(resp){
			addToView(resp.msg);
			$scope.userList = resp.users;
			$scope.$apply();
		});
		
		socketService.on('loggedIn', function(resp){
			socketService.user = resp.msg;
			$scope.userList = resp.users;
			$scope.$apply();
			$state.go('chat');
		});
		
		socketService.on('loggedOut', function() {
			socketService.user = null;
			$state.go('login');
		})
		
		socketService.on('chooseDiffName', function() {
			alert("someone's thinking like you, they already took that name");
		})
		
		socketService.on('fakeLog', function() {
			socketService.user = null;
			alert("sorry but you have to login");
			$state.go('login');
		})
		
		function addToView(msg) {
			var span=document.createElement("div");
			span.appendChild(document.createTextNode(msg));
			document.getElementById("messages").appendChild(span);
		}
	}
})(angular)