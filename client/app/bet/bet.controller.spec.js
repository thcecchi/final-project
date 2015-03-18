'use strict';

describe('Controller: BetCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var BetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BetCtrl = $controller('BetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
