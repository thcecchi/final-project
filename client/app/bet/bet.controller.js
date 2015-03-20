'use strict';

angular.module('finalProjectApp')
  .controller('BetCtrl', function ($scope, $http, Auth, User, socket) {
    $scope.message = 'Hello';

    // gets the username of logged in user ////////
    $scope.getCurrentUser = Auth.getCurrentUser
    // //////////////////////////////////////////

    // Use the User $resource to fetch all users //////////
    $scope.users = User.query();
    console.log($scope.users)
    // //////////////////////////////////////////////////

    $scope.awesomeBets = []
    $scope.todaysBets = []

    $http.get('/api/bets').success(function(awesomeBets) {
      $scope.awesomeBets = awesomeBets;
      socket.syncUpdates('bet', $scope.awesomeBets);

      $scope.awesomeBets.forEach(function(bets) {
        if (moment().format('YYYY-MM-DD') == bets.date) {
          $scope.todaysBets.push(bets)
          console.log($scope.todaysBets)

          $scope.awesomeBets = $scope.todaysBets
          console.log($scope.awesomeBets)
        }
      })
    })


    $scope.addBet = function(opponent, amount) {
      if($scope.amount === '') {
        return;
      }
      console.log(opponent)
      console.log(amount)
      console.log(moment().format('YYYY-MM-DD'))
      console.log($scope.getCurrentUser().name)
      console.log($scope.getCurrentUser().picks)

      $http.post('/api/bets', {
        date: moment().format('YYYY-MM-DD'),
        user1: $scope.getCurrentUser().name,
        user1picks: $scope.getCurrentUser().picks,
        user2: opponent,
        wager: amount
        });
      $scope.amount = '';

      // $scope.getCurrentUser().picks = [] // clears the user's picks after a bet object is created. <!-- NEED TO HTTP PUT TO USER -->
    };


    $scope.acceptChallengeBet = function(id) {
      $http.put('/api/bets/' + id, {
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
