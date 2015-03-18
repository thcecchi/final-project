'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/feed', {
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedCtrl'
      });
  });
