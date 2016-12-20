'use strict';

/**
 * @ngdoc overview
 * @name zdApp
 * @description
 * # zdApp
 *
 * Main module of the application.
 */

angular
  .module('zdApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'md.data.table'
  ])
  .config(function ($routeProvider, $qProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $qProvider.errorOnUnhandledRejections(false);  
  });
