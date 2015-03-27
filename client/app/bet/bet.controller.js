'use strict';

angular.module('finalProjectApp')
  .controller('BetCtrl', function ($scope, $http, Auth, User, socket, $routeParams) {
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
    $scope.acceptedBets = []
    $scope.completedBets = []
    $scope.pendingBets = []
    $scope.tiedBets = []




    $http.get('/api/bets').success(function(awesomeBets) {
      $scope.awesomeBets = awesomeBets;
      socket.syncUpdates('bet', $scope.awesomeBets);

      $scope.awesomeBets.forEach(function(bets) {
        if (moment().format('MM-DD-YYYY') === bets.date && bets.hasOwnProperty('winner') == false && bets.betStatus === 'pending') {
          $scope.todaysBets.push(bets)
          console.log($scope.todaysBets)
        }

        else if (moment().format('MM-DD-YYYY') === bets.date && bets.betStatus === 'accepted' && bets.hasOwnProperty('winner') == false) {
          $scope.acceptedBets.push(bets)
          console.log($scope.acceptedBets)
        }

        else if (bets.hasOwnProperty('winner') == true && bets.winner != 'tie') {
          angular.element('.challengeBet').remove()
          $scope.completedBets.push(bets)
          console.log($scope.completedBets)
        }

        else if (bets.winner == 'tie') {
          $scope.tiedBets.push(bets)
          console.log($scope.tiedBets)
        }

      })
    })


    $scope.addBet = function(opponent, amount) {
      if($scope.amount === '') {
        return;
      }
      console.log(opponent)
      console.log(amount)
      console.log(moment().format('MM-DD-YYYY'))
      console.log($scope.getCurrentUser().name)
      console.log($scope.getCurrentUser().picks)

      $http.post('/api/bets', {
        date: moment().format('MM-DD-YYYY'),
        user1: $scope.getCurrentUser().name,
        user1picks: $scope.getCurrentUser().picks,
        user2: opponent,
        wager: amount,
        betStatus: 'pending'
        });
      $scope.amount = '';

      // clear current users picks
      var userId = $scope.getCurrentUser()._id
      console.log(userId)
      $scope.clearPicks(userId)
    };


    $scope.acceptChallengeBet = function() {
      $http.put('/api/bets/' + $routeParams.betId, {
        user2picks: $scope.getCurrentUser().picks,
        betStatus: 'accepted'
      }).success(function (data) {
        console.log(data);

        // clear current users picks
        var userId = $scope.getCurrentUser()._id
        console.log(userId)
        $scope.clearPicks(userId)

      })
    };

    $scope.submitRecord = function(id, total1, total2, user1, user2, record1, record2) {
      console.log(record1)
      console.log(record2)
      if(total1 > total2) {
        $http.put('/api/bets/' + id, {
          user1Total: total1,
          user2Total: total2,
          winner: user1,
          loser: user2,
          user1record: record1,
          user2record: record2,

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
          user1record: record1,
          user2record: record2,
        }).success(function (data) {
          console.log(data);
        })
      }

      else if (total2 == total1) {
        $http.put('/api/bets/' + id, {
          user1Total: total1,
          user2Total: total2,
          winner: 'tie',
          loser: 'tie',
          user1record: record1,
          user2record: record2,
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

    $scope.clearPicks = function(id) {
      $http.put('/api/users/' + id, {
        picks: []
      }).success(function (data) {
        console.log(data);
      })
    }

    $scope.checkForAcceptedBets = function() {
      // $scope.awesomeBets.forEach(function (bet) {
        if (bets.hasOwnProperty('accepted')) {
          console.log('has')
          $( ".challengeBet" ).remove();
        }
      // })
    }



  });
