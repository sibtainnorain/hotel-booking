angular.module('hotelSearchApp', ['ui.bootstrap', 'dataGrid', 'pagination'])
.controller('hotelsController', ['$scope', 'hotelsFactory', '$filter', function ($scope, hotelsFactory, $filter) {

    $scope.gridOptions = {
        data: [],
        urlSync: true
    };

    hotelsFactory.getData().then(function (responseData) {
        $scope.gridOptions.data = responseData.data.hotels;
    });
}])
.factory('hotelsFactory', function ($http) {
    return {
        getData: function () {
            return $http({
                method: 'GET',
                url: 'https://api.myjson.com/bins/tl0bp'
            });
        }
    }
});