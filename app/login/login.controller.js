(function(angular) {
	angular
		.module("myApp")
		.controller('loginController', controller);
		
	function controller($scope, $state, socketService) {
		if(socketService.user) {
			if(socketService.isMobile)
				$state.go('chatMobile');
			else
				$state.go('chat');
		}
		$scope.login = login;
		
		function login() {
			if(!socketService.connected)
				socketService.startCon();
			var loginName = document.getElementById("name").value;
			if(loginName != "") {
				socketService.emit('login', loginName);
			} else {
				alert("Enter a fucking name, you moron!");
			}
		}
	}
})(angular)