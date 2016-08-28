var mainApp = angular.module('mainApp', ['ngSanitize', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'ngAnimate', 'ngMessages', 'slickCarousel']);

mainApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('MemberRegister', {
			url: "/",
			templateUrl: "app/partials/register.tpl.html",
			controller: "memberCtrl as mCtrl"
		})
		/*.state('Home', {
			url: '/Home',
			templateUrl: 'app/partials/home.tpl.html',
			controller: 'homeCtrl as hCtrl'
		})*/
});
mainApp.config(['slickCarouselConfig', function (slickCarouselConfig) {
	slickCarouselConfig.dots = true;
	slickCarouselConfig.autoplay = false;
  }])
