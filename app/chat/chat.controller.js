(function(angular) {
	angular
		.module("myApp")
		.controller('chatController', controller);
		
	function controller($scope, $state, socketService) {
		if(!socketService.user) {
			$state.go('login');
		}
		$scope.data = "";
		$scope.send = send;
		
		function send(){
			socketService.emit('chat message', $scope.data);
			$scope.data="";
		}
	}
})(angular)