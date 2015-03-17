'use strict';

angular.module('finalProjectApp')
  .controller('PickCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

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
    // object watch polyfill ///////////////////////////////
    if (!Object.prototype.watch) {
	     Object.defineProperty(Object.prototype, "watch", {
		       enumerable: false
      		, configurable: true
      		, writable: false
      		, value: function (prop, handler) {
			 var oldval = this[prop]
    			, newval = oldval
    			, getter = function () {
    				return newval;
    			}
    			, setter = function (val) {
    				oldval = newval;
    				return newval = handler.call(this, prop, oldval, val);
    			};

			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				    });
			     }
		      }
	     });
     }
    /////////////////////////////////////////////////////////


    $scope.checkPicks = function() {
      // $scope.awesomeGames[0].watch('event_status', function() {
        // check if game is completed
          if ($scope.awesomeGames[0].event_status == "scheduled") {
            console.log("game completed!")

            $scope.getCurrentUser().picks.forEach(function(pks) {
              console.log(pks)

              $scope.awesomeGames.forEach(function(games) {
                // changing the values of the home and away score for test purposes
                games.home_points_scored = 10
                games.away_points_scored = 5

                if (games.home_points_scored > games.away_points_scored &&
                pks == games.home_team.abbreviation) {
                  $scope.getCurrentUser().record.push(1)
                  console.log($scope.getCurrentUser().record)
                }

                else if (games.away_points_scored > games.home_points_scored &&
                pks == games.away_team.abbreviation) {
                  $scope.getCurrentUser().record.push(0)
                  console.log($scope.getCurrentUser().record)
                }

                else {
                  console.log("wtf!?!?")
                }
              })
            })
          }
      // })
    }

    $scope.submitPicks = function(newPicks, id) {
      $http.put('/api/users/' + id, {
        picks: newPicks
      }).success(function (data) {
        console.log(data);
      })
    };


  });
