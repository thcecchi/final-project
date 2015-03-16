'use strict';

angular.module('finalProjectApp')
  .controller('PickCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.makePick = function(winner, loser, game) {

      console.log(game)
      $scope.getCurrentUser().picks.push({pick1: winner, pick2: loser})
      console.log($scope.getCurrentUser().picks)
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

      $scope.awesomeGames[i].watch('event_status', function() {
        $scope.awesomeGames.forEach(function(game) {
          if ($scope.awesomeGames.event_status == "completed") {

          }
        })

        $scope.getCurrentUser().picks.forEach(function(pk) {
          $scope.awesomeGames.forEach(function(games) {
            if(pk.pick1 > pk.pick2) {
              $scope.getCurrentUser().record.push(1)
            }

            else {
              $scope.getCurrentUser().record.push(0)
            }
          })
        })
      }



  });
