'use strict';

angular.module('finalProjectApp')
  .controller('BetCtrl', function ($scope, $http, Auth, User, socket) {
    $scope.message = 'Hello';

    // Use the User $resource to fetch all users //////////
    $scope.users = User.query();
    console.log($scope.users)
    // //////////////////////////////////////////////////

    $http.get('/api/bets').success(function(awesomeBets) {
      $scope.awesomeBets = awesomeBets;
      socket.syncUpdates('bet', $scope.awesomeBets);
    });

    // gets the username of logged in user ////////
    $scope.getCurrentUser = Auth.getCurrentUser
    // //////////////////////////////////////////


    $scope.addBet = function(opponent, amount) {
      if($scope.amount === '') {
        return;
      }
      console.log(opponent)
      console.log(amount)
      console.log(moment('MM-DD-YYYY'))
      console.log($scope.getCurrentUser().name)
      console.log($scope.getCurrentUser().picks)

      $http.post('/api/bets', {
        date: moment('MM-DD-YYYY'),
        user1: $scope.getCurrentUser().name,
        user1picks: $scope.getCurrentUser().picks,
        user2: opponent,
        wager: amount
        });
      $scope.amount = '';
    };


    $scope.acceptChallengeBet = function(id) {
      $http.put('/api/bets/' + id, {
        user2: $scope.getCurrentUser().name,
        user2picks: $scope.getCurrentUser().picks,
      }).success(function (data) {
        console.log(data);
      })
    };


    $scope.deleteBet = function(bet) {
      $http.delete('/api/bets/' + bet._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('bet');
    });



  });
