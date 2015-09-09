'use strict';

/**
 * @ngdoc function
 * @name urlshortenerAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urlshortenerAngularApp
 */
angular.module('urlshortenerAngularApp')
        .controller('MainCtrl',['$scope', 'Url', function($scope, Url) {
            $scope.myForm = {};
            $scope.error = {};
            $scope.valid = {};
            $scope.url = {
                urlshortener_url: {
                    url: ""
                }
            };

            $scope.submit = function() {
                Url.save($scope.url).$promise.then(
                        function(data) {
                            $scope.valid = data.message;
                        },
                        function(errorResult) {
                            $scope.error = errorResult.data.errors.children.url.errors[0];
                        }
                );

            };

            $scope.isEmptyObject = function(item) {
                return angular.equals({}, item);
            };
        }]);
