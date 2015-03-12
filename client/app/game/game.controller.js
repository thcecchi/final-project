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

      // $scope.addThing = function() {
      //   if($scope.newThing === '') {
      //     return;
      //   }
      //   $http.post('/api/things', { name: $scope.newThing });
      //   $scope.newThing = '';
      // };
      //
      // $scope.deleteThing = function(thing) {
      //   $http.delete('/api/things/' + thing._id);
      // };
      //
      // $scope.$on('$destroy', function () {
      //   socket.unsyncUpdates('thing');
      // });


    });
