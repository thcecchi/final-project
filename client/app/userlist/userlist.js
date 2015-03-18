'use strict';

angular.module('finalProjectApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/userlist', {
        templateUrl: 'app/userlist/userlist.html',
        controller: 'BetCtrl'
      });
  });
