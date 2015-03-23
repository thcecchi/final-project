'use strict';

angular.module('finalProjectApp')
  .controller('FeedcommentCtrl', function ($scope, $http, socket, Auth) {
    $scope.message = 'Hello';

    $scope.awesomeFeedComments = [];

    $http.get('/api/feedcomments').success(function(awesomeFeedComments) {
      $scope.awesomeFeedComments = awesomeFeedComments;
      socket.syncUpdates('feedcomment', $scope.awesomeFeedComments);
    });

    // gets the username of logged in user ////////
    $scope.getCurrentUser = Auth.getCurrentUser
    // //////////////////////////////////////////


    $scope.addFeedComment = function(newFeedComment, singleBet) {
      if($scope.newFeedComment === '') {
        return;
      }
      $http.post('/api/feedcomments', {
        comment: newFeedComment,
        bet: singleBet,
        user: $scope.getCurrentUser().name,
        });
      $scope.newFeedComment = '';
    };


    $scope.deleteFeedComment = function(feedComment) {
      $http.delete('/api/feedcomments/' + feedComment._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('feedcomment');
    });


  });
