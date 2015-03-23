'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/makepicks/:betId', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
