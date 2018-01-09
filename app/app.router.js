(function(angular) {
	angular
		.module("myApp")
		.config(router);
		
	function router($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/',
				controller  : "loginController",
				templateUrl : "./app/login/login.html"
			})
			.state('chat', {
				url: '/chat',
				controller  : "chatController",
				templateUrl : "./app/chat/chat.html"
			})
		$urlRouterProvider.otherwise('/');
	}
})(angular)