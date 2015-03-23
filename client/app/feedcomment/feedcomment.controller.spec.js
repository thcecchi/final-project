'use strict';

describe('Controller: FeedcommentCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var FeedcommentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedcommentCtrl = $controller('FeedcommentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
