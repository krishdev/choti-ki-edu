var memberCtrlFn = function ($scope, $rootScope, postContact, $timeout) {
	var mCtrl = this;
	$scope.user = {
		name: '',
		email: '',
		address: '',
		languages: [],
		otherLan: '',
		availableDays: [],
		phone: ''
	}
	mCtrl.messages = {
		error: '',
		success: ''
	}
	mCtrl.location = {
		sideContLocation: "app/partials/slideContent.tpl.html",
		carouselLocation: "app/partials/slide.tpl.html"
	};
	$scope.carousel = {
		imgUrl: ['photos/instructorWithStudent01.jpeg', 'photos/instructorWithStudent02.jpeg', 'photos/instructorWithStudent03.jpg', 'photos/instructorWithStudent04.jpg', 'photos/instructorWithStudent05.jpg', 'photos/instructorWithStudent06.jpg', 'photos/instructorWithStudent07.jpg', 'photos/instructorWithStudent08.jpg', 'photos/volunters.jpeg'],
		name: ''
	}
	$scope.slickConfigLoaded = true;
	$scope.currentIndex = 0;
	$scope.slickConfig = {
		method: {},
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		enabled: true,
		autoplay: true,
		draggable: false,
		autoplaySpeed: 5000,
		method: {},
		event: {
			beforeChange: function (event, slick, currentSlide, nextSlide) {},
			afterChange: function (event, slick, currentSlide, nextSlide) {},
			init: function (event, slick) {
				slick.slickGoTo($scope.currentIndex); // slide to correct index when init 
			}
		},
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
        },
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
        },
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
        }
      ]
	};
	var popAnElement = function (argArray, elem) {
		var indexOfTag = argArray.indexOf(elem);
		if (argArray.length != 1) {
			if (indexOfTag !== 0) {
				argArray.splice(indexOfTag, indexOfTag);
			} else {
				argArray.splice(indexOfTag, indexOfTag + 1);
			}
		} else {
			argArray.pop();
		}
		return argArray;
	}
	mCtrl.addDays = function (event, day) {
		angular.element($(event.target)).toggleClass("active");
		$(event.target).parent().toggleClass('active');
		var elementTarget = angular.element($(event.target));
		if (elementTarget.hasClass('active')) {
			$scope.user.availableDays.push(day);
		} else if ($scope.user.availableDays.indexOf(day) != -1) {
			popAnElement($scope.user.availableDays, day);
		}
	}
	mCtrl.addLang = function (event, lang) {
		angular.element($(event.target)).toggleClass("active");
		$(event.target).parent().toggleClass('active');
		var elementTarget = angular.element($(event.target));
		if (elementTarget.hasClass('active')) {
			$scope.user.languages.push(lang);
		} else if ($scope.user.languages.indexOf(lang) != -1) {
			popAnElement($scope.user.languages, lang);
		}
		console.log($scope.user.languages);
	}
	mCtrl.submitForm = function (isValid) {
		if (isValid) {
			if ($scope.user) {
				console.log($scope.user);
				if (($scope.user.languages.length > 0 || $scope.user.otherLan) && $scope.user.availableDays.length > 0) {
					var userObj = $scope.user;
					var data = '{"inputUsername":"' + userObj.name + '","inputEmail": "' + userObj.email + '","inputPhone": "' + userObj.phone + '","inputAddress": "' + userObj.address + '","inputAvail":"' + userObj.availableDays.join(",") + '","inputLang" : "' + userObj.languages.join(",") + '"}';
					data = JSON.parse(data);
					postContact.postData('emailUs.php', data).then(function (data) {
						$scope.user = "";
						mCtrl.messages.success = 'Successfully registered!! Any one of our guys will get in touch with you shortly.';
					});
				} else
					mCtrl.messages.error = 'Please fill out all the fields.';
			} else
				mCtrl.messages.error = 'Please fill out all the fields.';
		} else
			mCtrl.messages.error = 'Please fill out all the fields.';
		$timeout(function () {
			mCtrl.messages.error = '';
			mCtrl.messages.success = '';
		}, 3000);
	}
}
mainApp.controller('memberCtrl', ['$scope', '$rootScope', 'postContact', '$timeout', memberCtrlFn]);
