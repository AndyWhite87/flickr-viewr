
describe('itemAuthorLinkFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('adds expected authorLink property to items', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemAuthorLink')(item);

    expect(filteredItem.authorLink).toBeDefined();
    expect(filteredItem.authorLink).toEqual('https://www.flickr.com/photos/user/');

  });

  it('returns the item unchanged if its link property is not as expected', function() {

    var item = new TestItem();
    item.link = item.link.substring(0, item.link.length - 1);

    var filteredItem = $filter('itemAuthorLink')(item);
    expect(filteredItem.authorLink).not.toBeDefined();
    expect(filteredItem).toEqual(item);

  });

  it('returns the item unchanged if its link property is not present', function() {

    var item = new TestItem();
    delete item.link;
    
    var filteredItem = $filter('itemAuthorLink')(item);
    expect(filteredItem.authorLink).not.toBeDefined();
    expect(filteredItem).toEqual(item);

  });

});
