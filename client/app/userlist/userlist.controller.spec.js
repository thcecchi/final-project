'use strict';

describe('Controller: UserlistCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var UserlistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserlistCtrl = $controller('UserlistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
