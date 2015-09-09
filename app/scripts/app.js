'use strict';

/**
 * @ngdoc overview
 * @name urlshortenerAngularApp
 * @description
 * # urlshortenerAngularApp
 *
 * Main module of the application.
 */
angular
        .module('urlshortenerAngularApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'UrlService',
            'LoaderDirective',
            'SpinnerServices'
        ])
        .constant('myConfig', {
            backend: 'XXX',
            client_id: "XXX",
            client_secret: "XXX"
        })
        .config(function($routeProvider, $httpProvider) {
            $httpProvider.interceptors.push('SpinnerInjector');
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        controllerAs: 'main'
                    })
                    .when('/:short_code', {
                        templateUrl: 'views/redirect.html',
                        controller: 'RedirectCtrl',
                        controllerAs: 'redirect'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
        });
