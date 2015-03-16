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

    $scope.getSingleEvent = function (evtId) {
      $http.get('/api/games/').success(function(awesomeGames) {
        console.log('that')
        $scope.awesomeGames = awesomeGames;

        awesomeGames.forEach(function (evt) {
          if (evt.event_id == evtId) {
            console.log(evt.event_id)
          }
        })

      });
    }



    });
