'use strict';

angular.module('LoaderDirective', [])
        .directive("loader", ['$rootScope', function() {
            return function($rootScope, element) {
                $rootScope.$on("loader_show", function() {
                    return element.show();
                });
                return $rootScope.$on("loader_hide", function() {
                    return element.hide();
                });
            };
        }]);