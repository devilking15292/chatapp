(function(angular) {
	angular
		.module("myApp")
		.controller('mainController', controller);
		
	function controller($scope, $state, $mdMedia, socketService) {
		$scope.logout = logout;
		$scope.loginName = "";
		$scope.loggedIn = false;
		$scope.isMobile = socketService.isMobile = true;
		
		if(screen.width > 1000) {
			$scope.isMobile = socketService.isMobile = false;
			$state.go('login');
		} else {
			$scope.isMobile = socketService.isMobile = true;
			$state.go('loginMobile');
		}
		
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
			$scope.loggedIn = true;
			$scope.$apply();
			if(socketService.isMobile)
				$state.go('chatMobile');
			else
				$state.go('chat');
		});
		
		socketService.on('loggedOut', function() {
			socketService.user = null;
			$scope.userList = {};
			$scope.loggedIn = false;
			if(socketService.isMobile)
				$state.go('loginMobile');
			else
				$state.go('login');
		})
		
		socketService.on('chooseDiffName', function() {
			alert("someone's thinking like you, they already took that name");
		})
		
		socketService.on('fakeLog', function() {
			socketService.user = null;
			alert("sorry but you have to login");
			if(socketService.isMobile)
				$state.go('loginMobile');
			else
				$state.go('login');
		})
		
		function addToView(msg) {
			var span=document.createElement("div");
			span.appendChild(document.createTextNode(msg));
			document.getElementById("messages").appendChild(span);
		}
	}
})(angular)