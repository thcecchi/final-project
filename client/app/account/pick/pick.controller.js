'use strict';

angular.module('finalProjectApp')
  .controller('PickCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

    // check picks at 3am daily

    var now = new Date();
    var millisTill3 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0, 0) - now;
    if (millisTill3 < 0) {
        millisTill3 += 86400000; // it's after 3am, check again at 3am tomorrow.
    }
    setTimeout($scope.checkPicks, millisTill3);


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
    // if (!Object.prototype.watch) {
	  //    Object.defineProperty(Object.prototype, "watch", {
		//        enumerable: false
    //   		, configurable: true
    //   		, writable: false
    //   		, value: function (prop, handler) {
		// 	 var oldval = this[prop]
    // 			, newval = oldval
    // 			, getter = function () {
    // 				return newval;
    // 			}
    // 			, setter = function (val) {
    // 				oldval = newval;
    // 				return newval = handler.call(this, prop, oldval, val);
    // 			};
    //
		// 	if (delete this[prop]) { // can't watch constants
		// 		Object.defineProperty(this, prop, {
		// 			  get: getter
		// 			, set: setter
		// 			, enumerable: true
		// 			, configurable: true
		// 		    });
		// 	     }
		//       }
	  //    });
    //  }
    /////////////////////////////////////////////////////////


    $scope.checkPicks = function() {
          if ($scope.awesomeGames[0].event_status == "completed") {
            console.log("game completed!")

            $scope.getCurrentUser().picks.forEach(function(pks) {
              console.log(pks)
              if (index < $scope.getCurrentUser().picks.length) {

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
            }
          })
          // $scope.getCurrentUser().picks = [] // clears the user's picks after a bet object is created
        }
    }

    $scope.submitPicks = function(newPicks, id) {
      $http.put('/api/users/' + id, {
        picks: newPicks
      }).success(function (data) {
        console.log(data);
      })
    };


  });
