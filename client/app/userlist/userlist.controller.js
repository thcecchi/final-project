'use strict';

angular.module('finalProjectApp')
  .controller('UserlistCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.template = {};
    $scope.setValue = function(user) {
        $scope.template.template_name = user.name;
    }


  });
