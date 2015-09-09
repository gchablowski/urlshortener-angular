'use strict';

/**
 * @ngdoc function
 * @name urlshortenerAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urlshortenerAngularApp
 */
angular.module('urlshortenerAngularApp')
        .controller('RedirectCtrl', ['$scope', 'Url', '$routeParams', '$window', '$location', function($scope, Url, $routeParams, $window, $location) {
                $scope.error = {};
                if ($routeParams.short_code) {
                   Url.get({token: $routeParams.short_code}).$promise.then(
                            function(data) {
                                $window.location.href = data.url;
                            },
                            function(error) {
                                $scope.error = error.data.message;
                            }
                    );
                } else {
                    $location.path('/').replace();
                }
                $scope.isEmptyObject = function(item) {
                    return angular.equals({}, item);
                };
            }]);
