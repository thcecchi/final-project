'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/feed/feed.html',
        controller: 'BetCtrl'
      });
  });
