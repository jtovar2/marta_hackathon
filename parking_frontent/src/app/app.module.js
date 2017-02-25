(function () {
    angular.module('app', ['app.routes', 'app.core', 'app.utils',
     'app.utils.logger', 'uiGmapgoogle-maps', 'geolocation'])
        .run();
})();
