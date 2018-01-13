(function(angular) {
	angular
		.module("myApp")
		.controller('chatController', controller);
		
	function controller($scope, $state, $mdToast, socketService) {
		if(!socketService.user) {
			if(socketService.isMobile)
				$state.go('loginMobile');
			else
				$state.go('login');
		}
		$scope.data = "";
		$scope.send = send;
		
		$scope.showFaces = false;
		$scope.toggleFaces = toggleFaces;
		
		function toggleFaces() {
			$scope.showFaces = !$scope.showFaces;
		}
		
		function send(){
			var chat = document.getElementById("chat").value;
			if(chat != "") {
				socketService.emit('chat message', chat);
				document.getElementById("chat").value="";
			} else {
				//alert("what the fuck are you trying to send ? type something..!");
				$mdToast.show(
						$mdToast
							.simple()
							.textContent("what the fuck are you trying to send ? type something..!")
							.position("top left")
							.hideDelay(3000)
					);
			}
		}
	}
})(angular)