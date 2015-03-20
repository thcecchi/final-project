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
            console.log("game completed!")

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
                  bets.user1picks.push(1)
                  console.log(bets.user1picks)
                }

                else if (games.away_points_scored > games.home_points_scored &&
                pks == games.away_team.abbreviation) {
                  bets.user1picks.push(0)
                  console.log(bets.user1picks)
                }

                else {
                  console.log("wtf!?!?")
                }
              })
            })
          })
        }
      }


          $scope.checkUser2Picks = function() {
              // check to see if the games are over
            if ($scope.awesomeGames[0].event_status == "scheduled") {
              console.log("game completed!")
              // iterate through each bet object
                    $scope.awesomeBets.forEach(function(bets) {
                      console.log(bets)

                    // check user1picks
                      bets.user2picks.forEach(function(pks) {

                      $scope.awesomeGames.forEach(function(games) {
                        // changing the values of the home and away score for test purposes
                        games.home_points_scored = 10
                        games.away_points_scored = 5
                        //

                        if (games.home_points_scored > games.away_points_scored &&
                        pks == games.home_team.abbreviation) {
                          bets.user2picks.push(1)
                          console.log(bets.user1picks)
                        }

                        else if (games.away_points_scored > games.home_points_scored &&
                        pks == games.away_team.abbreviation) {
                          bets.user2picks.push(0)
                          console.log(bets.user1picks)
                        }

                        else {
                          console.log("wtf!?!?")
                        }
                      })
                    })
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
