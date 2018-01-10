(function(angular) {
	angular
		.module("myApp")
		.controller('loginController', controller);
		
	function controller($scope, $state, socketService) {
		if(socketService.user) {
			$state.go('chat');
		}
		$scope.login = login;
		
		function login() {
			var loginName = document.getElementById("name").value;
			if(loginName != "") {
				socketService.emit('login', loginName);
			} else {
				alert("Enter a fucking name, you moron!");
			}
		}
	}
})(angular)