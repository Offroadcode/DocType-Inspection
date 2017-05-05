angular.module('umbraco').controller('DocTypeInfo.ContextMenu.Controller',
['$scope', '$controller', 'doctypeInfoApiResource',
function ($scope, $controller, doctypeInfoApiResource) {

    /*--- Init functions ---*/
    $scope.init = function() {
        $scope.setVariables();
        $scope.getDocTypeById();
    };

    $scope.setVariables = function() {
        $scope.id = false;
        $scope.docType = {};
    };

    $scope.getDocTypeById = function() {
        $scope.$watch('id', function(newValue, oldValue) {
            if (newValue) {
                return doctypeInfoApiResource.getViewModel($scope.id).then(function (data) {
                    $scope.docType = data;
                    return true;
                });
            }
        }, true);
    };

    /*---- Init ----*/
    $scope.init();

}]);