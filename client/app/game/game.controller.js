'use strict';

angular.module('finalProjectApp')
  // .controller('GameCtrl', function ($scope) {
  //   $scope.message = 'Hello';
  // });
    .controller('GameCtrl', function ($scope, $http, socket) {
      $scope.awesomeGames = [];

      $http.get('/api/games').success(function(awesomeGames) {
        console.log('this')
        $scope.awesomeGames = awesomeGames;
        console.log(awesomeGames)
        socket.syncUpdates('game', $scope.awesomeGames);
      });


    });
