'use strict';

angular
    .module('hotelSearchApp', ['ui.bootstrap', 'dataGrid', 'angularMoment'])
    .controller('hotelsController', ['$scope', 'hotelsFactory', '$filter',
        function ($scope, hotelsFactory, $filter) {
            $scope.gridOptions = {
                data: [],
            };

            $scope.error = false;
            $scope.nights = 0;
            var hotels = [];

            $scope.searchHotels = function (dateFrom, dateTo) {
                $scope.error = false;
                $scope.nights = 0;

                if (!validDates(dateFrom, dateTo)) {
                    $scope.error = true;
                    $scope.gridOptions.data = [];
                    return;
                }

                let fromFilter = moment(dateFrom);
                let toFilter = moment(dateTo);
                
                hotelsFactory.getData().then(function (responseData) {
                    hotels = responseData.data.hotels;

                    $scope.nights = toFilter.diff(fromFilter, 'days');
                    let filteredHotels = [];

                    for (let i = 0; i < hotels.length; i++) {
                        let availability = hotels[i].availability;

                        for (let j = 0; j < availability.length; j++) {
                            let availabilityFrom = moment(availability[j].from, "DD-MM-YYYY");
                            let availabilityTo = moment(availability[j].to, "DD-MM-YYYY");

                            console.log(fromFilter);
                            console.log(availabilityFrom);

                            console.log(toFilter);
                            console.log(availabilityTo);

                            if (fromFilter.isBetween(availabilityFrom, availabilityTo, 'days', '[]') && toFilter.isBetween(availabilityFrom, availabilityTo, 'days', '[]')) {
                                hotels[i].price = hotels[i].price * $scope.nights;
                                console.log(j);
                                console.log(hotels[i].name);
                                filteredHotels.push(hotels[i]);
                                break;
                            }
                        }
                    }
                    $scope.gridOptions.data = filteredHotels;
                });
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

function validDates(dateFrom, dateTo) {
    if (dateFrom == undefined || dateTo == undefined) {
        return false;
    }

    let fromFilter = moment(dateFrom);
    let toFilter = moment(dateTo);

    if (fromFilter.isSame(toFilter) || fromFilter.isAfter(toFilter) || toFilter.isBefore(fromFilter)) {
        return false;
    }
    
    return true;
}