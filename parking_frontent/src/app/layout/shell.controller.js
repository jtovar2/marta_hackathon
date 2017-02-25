(function () {

    angular.module('app')
    /* @ngInject */
        .controller('ShellController', function ($window, $scope, $location, AuthService, logger) {

            var vm = this;

            vm.title = 'test';

            vm.isAuthed = AuthService.isAuthed();

        });

})();
