mainApp.directive('toggleClass', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function (e) {
				angular.element($("#myNavbar")).toggle();
			});
		}
	};
});
