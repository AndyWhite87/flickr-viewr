
describe('itemSrcFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('adds expected src property to items with jpg images', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemSrc')(item);

    expect(filteredItem.src).toBeDefined();
    expect(filteredItem.src).toEqual('https://farm1.staticflickr.com/123/456_789abc.jpg');

  });

  it('adds expected src property to items with "m_jpg" images', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemSrc')(item);

    expect(filteredItem.src).toBeDefined();
    expect(filteredItem.src).toEqual('https://farm1.staticflickr.com/123/456_789abc.jpg');

  });

  it('adds expected src property to items without "m_jpg" images', function() {

    var item = new TestItem();

    item.media.m = 'image-file.png';

    var filteredItem = $filter('itemSrc')(item);

    expect(filteredItem.src).toBeDefined();
    expect(filteredItem.src).toEqual('image-file.png');

  });

  it('returns the item unchanged if its media properties are not present', function() {

    var item1 = new TestItem();
    delete item1.media;
    
    var item2 = new TestItem();
    delete item2.media.m;

    var filteredItem1 = $filter('itemSrc')(item1);
    expect(filteredItem1.src).not.toBeDefined();
    expect(filteredItem1).toEqual(item1);

    var filteredItem2 = $filter('itemSrc')(item2);
    expect(filteredItem2.src).not.toBeDefined();
    expect(filteredItem2).toEqual(item2);

  });

});
