
describe('itemPublishedFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('updates items\' published property to expected string representation', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemPublished')(item);

    expect(filteredItem.published).toBeDefined();
    expect(filteredItem.published).toEqual('27th Oct 2015 at 12:00');

  });

  it('returns an item unchanged if published property is not a valid date', function() {

    var item = new TestItem();
    item.published = 'not a date';

    var filteredItem = $filter('itemPublished')(item);

    expect(filteredItem.published).toBeDefined();
    expect(filteredItem).toEqual(item);

  });

  it('returns an item unchanged if its published property is not present', function() {

    var item = new TestItem();
    delete item.published;

    var filteredItem = $filter('itemPublished')(item);

    expect(filteredItem.published).not.toBeDefined();
    expect(filteredItem).toEqual(item);

  });

});
