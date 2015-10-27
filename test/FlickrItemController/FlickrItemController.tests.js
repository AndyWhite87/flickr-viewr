
describe('FlickrItemController', function() {
  'use strict';

  var controller;

  beforeEach(function () {
    module('flickrItems');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    controller = $controller('FlickrItemController');
  }));

  it('has expected properties', function() {

    expect(controller.selected).toBeDefined();
    expect(controller.selected).toEqual(null);

    expect(controller.searched).toBeDefined();
    expect(controller.searched).toEqual(false);

    expect(controller.tags).toBeDefined();
    expect(controller.tags).toEqual('potato'); // Default tag

    expect(controller.items).toBeDefined();
    expect(controller.items).toEqual([]);

  });

  it('has expected methods', function() {

    expect(controller.showItemDetails).toBeDefined();
    expect(typeof controller.showItemDetails).toEqual('function');

    expect(controller.showTagSearch).toBeDefined();
    expect(typeof controller.showTagSearch).toEqual('function');

    expect(controller.searchTags).toBeDefined();
    expect(typeof controller.searchTags).toEqual('function');

  });

});