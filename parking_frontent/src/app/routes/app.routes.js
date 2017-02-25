(function () {
    'use strict';

    angular
        .module('app.routes')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    title: 'Home is where the heart is hahahaha',
                    params: {
                        obj: null
                    }
                }
            },
            {
                state: 'view1',
                config: {
                    url: '/view1',
                    templateUrl: 'app/view1/view1.html',
                    controller: 'View1Controller',
                    controllerAs: 'vm',
                    title: 'Dis View1 :D'
                }
            }
        ];
    }
})();
