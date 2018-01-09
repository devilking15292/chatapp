(function(angular) {
	angular
		.module("myApp")
		.controller('loginController', controller);
		
	function controller($scope, $state, socketService) {
		if(socketService.user) {
			$state.go('chat');
		}
		$scope.login = login;
		$scope.loginName = "";
		
		function login() {
			socketService.emit('login', $scope.loginName);
		}
	}
})(angular)