'use strict';

angular.module('finalProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $routeParams) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    // gets the username of logged in user ////////
    $scope.getCurrentUser = Auth.getCurrentUser
    // //////////////////////////////////////////


    $scope.addThing = function(newThing, evt) {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {
        name: newThing,
        game: evt,
        user: $scope.getCurrentUser().name,
        });
      $scope.newThing = '';
    };


    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });


  });
