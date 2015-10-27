describe('FlickrItemFilters', function() {
  'use strict';

  var $filter;

  var TestItem = function () {
    return {
      'title': 'Hello Potato',
      'link': 'https://www.flickr.com/photos/user/photo/',
      'media': {'m':'https://farm1.staticflickr.com/123/456_789abc_m.jpg'},
      'date_taken': '2015-10-27T12:00:00-00:00',
      'description': ' <p><a href=\'https://www.flickr.com/people/user/\'>user<\/a> posted a photo:<\/p> <p><a href=\'https://www.flickr.com/photos/user/photo/\' title=\'Hello Potato\'><img src=\'https://farm1.staticflickr.com/123/456_789abc_m.jpg\' width=\'240\' height=\'160\' alt=\'Hello Potato\' /><\/a><\/p> <p>Multi-line description.<br /> With a <a href=\'https://example.com\' rel=\'nofollow\'>link<\/a>.<\/p>',
      'published': '2015-10-27T12:00:00Z',
      'author': 'nobody@flickr.com (user)',
      'author_id': '10101010@N01',
      'tags': 'photo carrot greenpea squash'
    };
  };

  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  describe('itemSrc filter', function() {

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
});