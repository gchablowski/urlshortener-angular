'use strict';
angular.module('TokenInjectorServices', [])
        .factory('TokenInjector', ['myConfig', '$injector', '$rootScope', '$q', function(myConfig, $injector, $rootScope, $q) {
                return {
                    // optional method
                    'request': function(config) {
                        config.params = config.params || {};

                        if ($rootScope.oauth) {
                            config.params.access_token = $rootScope.oauth;

                        }
                        return config;
                    },
                    'responseError': function(rejection) {

                        if (rejection.status === 401) {

                            // Get a new token...
                            var $http = $injector.get('$http');
                            var Token = $injector.get('Token');
                            var deferred = $q.defer();

                            Token.get({client_id: myConfig.client_id,
                            client_secret: myConfig.client_secret},
                            function(data) {
                                $rootScope.oauth = data.access_token;
                            }).$promise.then(deferred.resolve, deferred.reject);

                            return deferred.promise.then(function() {
                                return $http(rejection.config);
                            });

                        }
                        return $q.reject(rejection);
                    }
                };
            }]);

