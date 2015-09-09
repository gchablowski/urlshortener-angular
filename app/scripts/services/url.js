'use strict';

angular.module('UrlService', ['ngResource'])
        .factory('Url', ['myConfig', '$resource',
            function(myConfig, $resource) {
                return $resource(myConfig.backend+':controller/:action/:token', {}, {
                    save:{method:'POST', params:{controller:'url',action:'add'}},
                    get:{method:'GET', params:{token:'@token'}}
                });
            }]);

