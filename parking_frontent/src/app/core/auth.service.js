(function () {

    angular.module('app')
    /* @ngInject */
        .factory('AuthService', function ($q, $http) {
            var services = {
                // Get Calls
                isAuthed: isAuthed
            };

            function success(data) {
                return $q.resolve(data.data);
            }

            function error(error) {
                console.log(error);
                console.log("There was an error");
                return $q.reject(error);
            }

            function isAuthed() {
                $http.get('/rest/user/isauthed').then(function (data) {
                    if (data.data.status === false) {
                        //TODO: this needs to redirect to appropriate auth URL based on LCP


                        ///window.location = env.OAUTH2_REDIRECT_URL;
                    } else {
                        return true;
                    }
                });
            }

            return services;

        });

})();
