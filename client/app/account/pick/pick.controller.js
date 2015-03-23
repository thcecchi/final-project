'use strict';

angular.module('finalProjectApp')
  .controller('PickCtrl', function ($scope, $http, Auth, User, socket) {
    $scope.message = 'Hello';

    // check picks at 3am daily

    var now = new Date();
    var millisTill3 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0, 0) - now;
    if (millisTill3 < 0) {
        millisTill3 += 86400000; // it's after 3am, check again at 3am tomorrow.
    }
    setTimeout($scope.checkUser1Picks, millisTill3);
    setTimeout($scope.checkUser2Picks, millisTill3);

    var user1Total = 0
    var user2Total = 0


    $scope.makePick = function(winner, game) {
      console.log(game)

      var gameVar = game;

      var indivPicks = {};

      indivPicks[gameVar] = {pick: winner};

      $scope.getCurrentUser().picks.push(winner)
      console.log($scope.getCurrentUser().picks)

      var newPicks = $scope.getCurrentUser().picks
      var userId = $scope.getCurrentUser()._id
      console.log($scope.getCurrentUser()._id)

      $scope.submitPicks(newPicks, userId)
    }


    $scope.checkUser1Picks = function() {
      // check to see if the games are over
          if ($scope.awesomeGames[0].event_status == "scheduled") {
            console.log("checking User1Picks!")

      // iterate through each bet object
            $scope.awesomeBets.forEach(function(bets) {
              console.log(bets)

            // check user1picks
              bets.user1picks.forEach(function(pks) {

              $scope.awesomeGames.forEach(function(games) {
                // changing the values of the home and away score for test purposes
                games.home_points_scored = 10
                games.away_points_scored = 5
                //

                if (games.home_points_scored > games.away_points_scored &&
                pks == games.home_team.abbreviation) {
                  bets.user1record.push(1)
                  console.log(bets.user1record)
                }

                else if (games.away_points_scored > games.home_points_scored &&
                pks == games.away_team.abbreviation) {
                  bets.user1record.push(0)
                  console.log(bets.user1record)
                }

                else {
                  console.log("wtf!?!?")
                }
              })
            })

            user1Total = bets.user1record.reduce(function(a, b) {
              return a + b;
            });

            // $scope.submitRecord(bets._id, user1Total)

            console.log('user1Total submit called at _id ' + bets._id + 'user1Total is ' + user1Total)
            console.log(user1Total)
          })
        }
      }


          $scope.checkUser2Picks = function() {
              // check to see if the games are over
            if ($scope.awesomeGames[0].event_status == "scheduled") {
              console.log("checking User2Picks!")
              // iterate through each bet object
                    $scope.awesomeBets.forEach(function(bets) {
                      console.log(bets)

                    // check user2picks
                      bets.user2picks.forEach(function(pks) {

                      $scope.awesomeGames.forEach(function(games) {
                        // changing the values of the home and away score for test purposes
                        games.home_points_scored = 10
                        games.away_points_scored = 5
                        console.log('this')
                        //

                        if (games.home_points_scored > games.away_points_scored &&
                        pks == games.home_team.abbreviation) {
                          bets.user2record.push(1)
                          console.log(bets.user2record)
                        }

                        else if (games.away_points_scored > games.home_points_scored &&
                        pks == games.away_team.abbreviation) {
                          bets.user2record.push(0)
                          console.log(bets.user2record)
                        }

                        else {
                          console.log("wtf!?!?")
                        }
                      })
                    })

                    user2Total = bets.user2record.reduce(function(a, b) {
                      return a + b;
                    });

                    $scope.submitRecord(bets._id, user1Total, user2Total, bets.user1, bets.user2, bets.user1record, bets.user2record)

                    console.log('user2Total submit called at _id ' + bets._id + 'user2Total is ' + user2Total + 'user2record is ' + bets.user2record + 'user1record is ' + bets.user1record)
                    console.log(user2Total)

                  })
                }
              }


    $scope.submitPicks = function(newPicks, id) {
      $http.put('/api/users/' + id, {
        picks: newPicks
      }).success(function (data) {
        console.log(data);
      })
    }


  });
