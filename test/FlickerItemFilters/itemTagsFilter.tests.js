
describe('itemTagsFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('updates items\' tags property to array as expected', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemTags')(item);

    var expectedTags = [ 'photo', 'carrot', 'greenpea', 'squash' ];

    expect(filteredItem.tags).toBeDefined();
    expect(filteredItem.tags).toEqual(expectedTags);

  });

  it('updates items\' tags to be empty array if tags string is empty', function() {

    var item = new TestItem();
    item.tags = '';

    var filteredItem = $filter('itemTags')(item);

    var expectedTags = [];

    expect(filteredItem.tags).toBeDefined();
    expect(filteredItem.tags).toEqual(expectedTags);

  });

  it('returns the item unchanged if its tags property is not present', function() {

    var item = new TestItem();
    delete item.tags;

    var filteredItem = $filter('itemTags')(item);

    expect(filteredItem.tags).not.toBeDefined();
    expect(filteredItem).toEqual(item);

  });

});
