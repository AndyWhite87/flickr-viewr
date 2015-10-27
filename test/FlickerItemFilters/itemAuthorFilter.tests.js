
describe('itemAuthorFilter', function() {
  'use strict';

  var TestItem = testHelpers.TestItem;

  var $filter;
  beforeEach(function () {
    module('flickrItems');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('updates the item\'s author property as expected', function() {

    var item = new TestItem();

    var filteredItem = $filter('itemAuthor')(item);

    expect(filteredItem.author).toBeDefined();
    expect(filteredItem.author).toEqual('user');

  });

  it('leaves un-prefixed item\'s author properties unchanged', function() {

    var item = new TestItem();

    item.author = 'someone@gmail.com (user)';

    var filteredItem = $filter('itemAuthor')(item);

    expect(filteredItem.author).toBeDefined();
    expect(filteredItem.author).toEqual('someone@gmail.com (user)');

  });

  it('adds default author property to item if author property is not present', function() {

    var item = new TestItem();
    delete item.author;

    var filteredItem = $filter('itemAuthor')(item);

    expect(filteredItem.author).toBeDefined();
    expect(filteredItem.author).toEqual("unknown");

  });

});