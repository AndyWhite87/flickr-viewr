(function(){
  'use strict';

angular.module('flickrItems')
       .service('flickrItemService', ['$q', '$http', '$filter', '$log',
                                      'itemSrcFilter', 'itemAuthorFilter', 'itemAuthorLinkFilter', 'itemPublishedFilter', 'itemDescriptionFilter',
                                      ItemService]);

  /**
   * FlickrItems DataService
   *
   * @returns {{loadAllItems: Function}}
   * @constructor
   */
  function ItemService($q, $http, $filter, $log, itemSrcFilter, itemAuthorFilter, itemAuthorLinkFilter, itemPublishedFilter, itemDescriptionFilter) {

    var url = 'https://api.flickr.com/services/feeds/photos_public.gne' +
              '?jsoncallback=JSON_CALLBACK' +
              '&format=json' +
              '&tags=potato';

    return {
      loadAllItems : function() {
        return $q.when($http.jsonp(url).then(
          function successCallback(response) {

            var items = response.data.items;

            // Run the returned items through filters to clean up the data
            angular.forEach(items, function(item) {
              item = itemSrcFilter(item);
              item = itemAuthorFilter(item);
              item = itemAuthorLinkFilter(item);
              item = itemPublishedFilter(item);
              item = itemDescriptionFilter(item);
            });

            return items;

          },
          function errorCallback(response) {

            $log.debug('jsonp error: ' + response.statusText + ' (' + response.status + ').');
            
          }
        ));
      }
    };
  }

})();
