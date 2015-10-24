(function(){
  'use strict';

  angular.module('flickrItems')
         .service('flickrItemService', ['$q', '$http', '$log', ItemService]);

  /**
   * FlickerItems DataService
   *
   * @returns {{loadAllItems: Function}}
   * @constructor
   */
  function ItemService($q, $http, $log) {

    var url = 'https://api.flickr.com/services/feeds/photos_public.gne' +
              '?jsoncallback=JSON_CALLBACK' +
              '&format=json' +
              '&tags=potato';

    // Adds a src attribute to each object in an array, based on that object's media.m property
    function getHighResImages(items) {

      angular.forEach(items, function(item) {
        
        var media = item.media.m;
        var fileEnding = media.slice(-6);

        if (fileEnding === '_m.jpg') {
          var src = media.substring(0, media.length - 6) + media.slice(-4);
          item.src = src;
        }
      });

      return items;
    }

    return {
      loadAllItems : function() {
        return $q.when($http.jsonp(url).then(
          function successCallback(response) {

            var items = response.data.items;

            var editedItems = getHighResImages(items);

            return editedItems;

          },
          function errorCallback(response) {

            $log.debug('jsonp error: ' + response.statusText + ' (' + response.status + ').');
            
          }
        ));
      }
    };
  }

})();
