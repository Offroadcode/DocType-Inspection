angular.module("umbraco.resources").factory("doctypeInfoApiResource", function ($http) {

	var doctypeInfoApiResource = {};

	doctypeInfoApiResource.getViewModel = function (id) {
		return $http.get('/umbraco/backoffice/api/DocTypeApi/GetDocTypeInformation?id=' + id).then(function(response) {
			console.log(response.data);
			return response.data;
		});
	};

	return doctypeInfoApiResource;
});
