'use strict';

/**
 * @ngdoc overview
 * @name smkApp
 * @description
 * # smkApp
 *
 * Main module of the application.
 */
angular
  .module('smkApp', [
    'ngAnimate'
  , 'ngResource'
  , 'ngRoute'
  , 'ngSanitize'

    // Bootstrap directives
  , 'ui.bootstrap'

    // AJAX spinner
  , 'angular-loading-bar'
  ])
  .constant('_', window._)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      , controller: 'MainCtrl'
      , reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });
  });
