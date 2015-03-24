'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createbet', {
        templateUrl: 'app/createbet/createbet.html',
        controller: 'MainCtrl'
      });
  });
