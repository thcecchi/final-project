'use strict';

describe('Controller: PickCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var PickCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PickCtrl = $controller('PickCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
