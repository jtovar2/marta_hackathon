(function () {
    'use strict';

    angular
        .module('app.view1')
        .controller('View1Controller', View1Controller);


    /* @ngInject */
    function View1Controller(View1Service, $q, $sce, $scope, $timeout) {
        var vm = this;
        var job_data = null;

        function getChartData(projectId, range, limit) {
            View1Service.getChartData(projectId, range, limit).then(function (data) {
                if (data.error) {
                    vm.errorMessage = data.error;
                }

                vm.chartData = data.chart_data;

                loadChart();
            });
        }
    }
})();
