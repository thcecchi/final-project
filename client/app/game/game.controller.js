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

    $scope.game_index = 0;
    $scope.game = {};

    $scope.next = function () {
      if ($scope.game_index >= $scope.awesomeGames.length - 1) {
        // $scope.game_index = 0;
        var el = angular.element('<a class="findOpponent col-md-12 col-lg-12 col-sm-12" href="/userlist"><h1>Find Opponent</h1></a>');
        // $('.last').append(el);
        $('.last').replaceWith(el);

        var el2 = angular.element('<a class="submitPicks col-md-12 col-lg-12 col-sm-12" href="/feed"><h1>Submit Picks</h1></a>');
        $('.lastAccept').replaceWith(el2);

        $('.BetCtrl').on("click", "a", function(){
          $scope.acceptChallengeBet();
          console.log('fired')
        });
      } else {
        $scope.game_index++;
      }
      console.log($scope.awesomeGames.length + '/' + $scope.game_index);
    };

    $scope.choose = function (game) {
      $scope.game = game;
    }



    });
