'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/gamesRoute', {
        templateUrl: 'app/gamesRoute/gamesRoute.html',
        controller: 'GamesRouteCtrl'
      });
  });
