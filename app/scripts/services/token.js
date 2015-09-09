'use strict';

angular.module('TokenServices', ['ngResource'])
        .factory ('Token', ['myConfig', '$resource',
            function(myConfig ,$resource) {
                return $resource(myConfig.backend+'oauth/v2/token',
                        {client_id: "@client_id",
                            client_secret: "@client_secret",
                            grant_type: "client_credentials"
                        }, {
                });
            }]);
