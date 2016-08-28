mainApp.factory('postContact', function ($http) {
	return {
		postData: function (fileName, data) {
			return $http.post(fileName, data);
		}
	}
});
