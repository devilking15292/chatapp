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
			var chat = document.getElementById("chat").value;
			if(chat != "") {
				socketService.emit('chat message', chat);
				$scope.data="";
			} else {
				alert("what the fuck are you trying to send ? type something..!");
			}
		}
	}
})(angular)