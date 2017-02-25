(function () {

    angular.module('app')
    /* @ngInject */
        .factory('HomeService', function ($q, $http) {
            var services = {
                getMartaBusesNear: getMartaBusesNear,
                getAllMartaBuses: getAllMartaBuses,
                testService:testService,
                getParkingCapacities: getParkingCapacities

            };

            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }

            function getAllMartaBuses()
            {
              return $http.get('rest/buses/all').then(success, error);
            }

            function getMartaBusesNear(lat, long)
            {
              return $http.get('rest/buses?lat=' + lat + '&lng=' + long).then(success, error);
            }

            function testService()
            {
                return $http.get('rest/javier').then(success, error);
            }

            function getParkingCapacities()
            {
                return $http.get('rest/get_parking_capacity').then(success, error);
            }

            return services;

        });

})();
