
describe('itemDescriptionFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('updates items\' description property to array as expected', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemDescription')(item);

    var expectedDescription = [
      'Multi-line description.',
      'With a <a href=\'https://example.com\' rel=\'nofollow\'>link<\/a>.'
    ];

    expect(filteredItem.description).toBeDefined();
    expect(filteredItem.description).toEqual(expectedDescription);

  });

  it('updates items\' description to be empty array if description is empty', function() {

    var item = new TestItem();
    item.description = ' <p><a href=\'https://www.flickr.com/people/user/\'>user<\/a> posted a photo:<\/p> <p><a href=\'https://www.flickr.com/photos/user/photo/\' title=\'Hello Potato\'><img src=\'https://farm1.staticflickr.com/123/456_789abc_m.jpg\' width=\'240\' height=\'160\' alt=\'Hello Potato\' /><\/a><\/p>';

    var filteredItem = $filter('itemDescription')(item);

    var expectedDescription = [];

    expect(filteredItem.description).toBeDefined();
    expect(filteredItem.description).toEqual(expectedDescription);

  });

  it('returns the item unchanged if its description property is not present', function() {

    var item = new TestItem();
    delete item.description;

    var filteredItem = $filter('itemDescription')(item);

    expect(filteredItem.description).not.toBeDefined();
    expect(filteredItem).toEqual(item);

  });

});
