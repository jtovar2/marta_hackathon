(function () {

    angular.module('app.view1')
    /* @ngInject */
        .factory('View1Service', function ($q, $http) {
            var services = {

                //Get Charts
                getChartData: getChartData

            };

            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }


            function getChartData(projectId, dateRange, limit) {
                return $http.get('rest/charts/getData?projectId=' + projectId + '&dateRange=' + dateRange +
                    '&limit=' + (limit ? limit : 1000))
                    .then(success, error);
            }

            return services;

        });

})();
