'use strict';

describe('Controller: GamesRouteCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var GamesRouteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GamesRouteCtrl = $controller('GamesRouteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
