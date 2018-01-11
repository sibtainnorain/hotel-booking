'use strict';
var HOTELS = [];

angular
    .module('hotelSearchApp', ['ui.bootstrap', 'dataGrid', 'angularMoment'])
    .controller('hotelsController', ['$scope', 'hotelsFactory', '$filter',
        function ($scope, hotelsFactory, $filter) {
            $scope.gridOptions = {
                data: [],
            };

            $scope.error = false;
            $scope.nights = 0;

            hotelsFactory.getData().then(function (responseData) {
                HOTELS = responseData.data.hotels;
            });

            $scope.searchHotels = function (dateFrom, dateTo) {
                $scope.error = false;

                if (dateFrom == undefined || dateTo == undefined) {
                    $scope.error = true;
                    return;
                }

                let fromFilter = moment(dateFrom);
                let toFilter = moment(dateTo);

                if (fromFilter.isAfter(toFilter) || toFilter.isBefore(fromFilter)) {
                    $scope.error = true;
                    return;
                }

                $scope.nights = toFilter.diff(fromFilter, 'days');
                let filteredHotels = [];

                for (let i = 0; i < HOTELS.length; i++) {
                    let availability = HOTELS[i].availability;

                    for (let j = 0; j < availability.length; j++) {
                        let availabilityFrom = moment(availability[j].from);
                        let availabilityTo = moment(availability[j].to);

                        if (fromFilter.isBetween(availabilityFrom, availabilityTo, null, '[]') && toFilter.isBetween(availabilityFrom, availabilityTo, null, '[]')) {
                            console.log(j);
                            console.log(HOTELS[i].name);
                            filteredHotels.push(HOTELS[i]);
                            break;
                        }
                    }
                }
                $scope.gridOptions.data = filteredHotels;
            };
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