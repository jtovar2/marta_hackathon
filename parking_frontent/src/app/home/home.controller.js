(function () {

    angular.module('app')
    /* @ngInject */
        .controller('HomeController', function ($location,
           $sce, $interval, $window, $state, uiGmapGoogleMapApi,
            $scope, geolocation, HomeService) {

            HomeService.getParkingCapacities().then(function(data)
            {
               google.charts.load('current', {'packages':['gauge']});
                google.charts.setOnLoadCallback(drawChart);
                $scope.chartData = data;

            })





            function drawChart()
            {
                var data = new google.visualization.DataTable($scope.chartData);


                 var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };
                var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

                chart.draw(data, options);
            }




















































            $scope.test = "issatest";
            $scope.lat = "";
            $scope.lng = "";

	    $scope.test = "THIS IS A TEST";
            $interval(getMartaBusesNear, 5000);

            $scope.markers = []

            var google_api_key = 'AIzaSyCCgkdEER9u5SiiHRkCub2MELrwgb2GYxM';

            $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 15 };

            uiGmapGoogleMapApi.then(function(maps) {
            });

            geolocation.getLocation().then(function(data)
          {
            $scope.map.center.latitude = data.coords.latitude;
            $scope.map.center.longitude = data.coords.longitude;


              $scope.lat = data.coords.latitude;
              $scope.lng = data.coords.longitude;
            console.log('latitude ' + data.coords.latitude + ' longitude ' +
          data.coords.longitude);
            var marker = {
              idKey : "Self",
              coords : {
                latitude : data.coords.latitude,
                longitude : data.coords.longitude
              }

            }
            $scope.markers.push(marker);
            getMartaBusesNear();

          })

          HomeService.testService().then(function(data)
          {
               $scope.test = data;
          })
          function getMartaBusesNear()
          {
            if($scope.lat == "" || $scope.lng == "")
            {
              return;
            }

            HomeService.getMartaBusesNear($scope.lat, $scope.lng).then(function(data){
              //TODO: test for errors
              $scope.markers = []
              console.log("this is being called");
              buses = data
              for(var i = 0; i < buses.length; i++)
              {
                var marker = {};
                marker['idKey'] = buses[i].ROUTE + " @ " + buses[i].TIMEPOINT;
                marker['coords'] = {latitude: buses[i].LATITUDE, longitude: buses[i].LONGITUDE}
                marker['options'] = {labelContent: buses[i].ROUTE + " @ " + buses[i].TIMEPOINT}

                $scope.markers.push(marker)
              }
            });
          }
        })
        .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        key: 'AIzaSyCCgkdEER9u5SiiHRkCub2MELrwgb2GYxM',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
    });
})();
