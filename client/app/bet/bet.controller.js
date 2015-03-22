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

      // clear current users picks
      var userId = $scope.getCurrentUser()._id
      console.log(userId)
      $scope.clearPicks(userId)
    };


    $scope.acceptChallengeBet = function(id) {
      $http.put('/api/bets/' + id, {
        user2picks: $scope.getCurrentUser().picks,
      }).success(function (data) {
        console.log(data);
      })
    };

    $scope.submitRecord = function(id, total1, total2, user1, user2) {
      console.log(total1)
      console.log(total2)
      if(total1 > total2) {
        $http.put('/api/bets/' + id, {
          user1Total: total1,
          user2Total: total2,
          winner: user1,
          loser: user2,
        }).success(function (data) {
          console.log(data);
        })
      }

      else if (total2 > total1) {
        $http.put('/api/bets/' + id, {
          user1Total: total1,
          user2Total: total2,
          winner: user2,
          loser: user1,
        }).success(function (data) {
          console.log(data);
        })
      }

    };


    $scope.deleteBet = function(bet) {
      $http.delete('/api/bets/' + bet._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('bet');
    });

    $scope.clearPicks= function(id) {
      $http.put('/api/users/' + id, {
        picks: []
      }).success(function (data) {
        console.log(data);
      })
    }



  });
