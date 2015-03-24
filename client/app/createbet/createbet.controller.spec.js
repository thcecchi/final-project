'use strict';

describe('Controller: CreatebetCtrl', function () {

  // load the controller's module
  beforeEach(module('finalProjectApp'));

  var CreatebetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreatebetCtrl = $controller('CreatebetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
