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
    'UrlService'
  ])
  .constant('myConfig', {
            backend: 'XXX',
            client_id: "XXX",
            client_secret: "XXX"
        })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
