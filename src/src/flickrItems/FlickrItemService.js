(function(){
  'use strict';

angular.module('flickrItems')
       .service('flickrItemService', ['$q', '$http', '$filter', '$log', ItemService]);

  /**
   * FlickrItems DataService
   *
   * @returns {{loadAllItems: Function}}
   * @constructor
   */
  function ItemService($q, $http, $filter, $log) {

    var url = 'https://api.flickr.com/services/feeds/photos_public.gne' +
              '?jsoncallback=JSON_CALLBACK' +
              '&format=json' +
              '&tags=potato';

    function filterItems(items) {

      var filters = {

        // Adds a high-res src attribute to an item, based on that item's media.m property
        src: function(item) {
          var media = item.media.m;
          var fileEnding = media.slice(-6);

          if (fileEnding === '_m.jpg') {
            var src = media.substring(0, media.length - 6) + media.slice(-4);
            item.src = src;
          }

          return item;
        },

        // Removes the default Flickr email prefix and suffix from an item's author property
        author: function(item) {
          var authorPrefix = 'nobody@flickr.com (';
          var authorStart = item.author.substring(0, authorPrefix.length);

          if (authorStart === authorPrefix) {
            item.author = item.author.replace(authorPrefix, '');
            item.author = item.author.substring(0, item.author.length -1);
          }

          return item;
        },

        // Transforms an item's published property into a readable representation
        published: function(item) {
          var published = new Date(item.published);

          if (typeof published.getMilliseconds === 'function') {
            var daySuffixes = ["th", "st", "nd", "rd"];
            var day = $filter('date')(published, 'dd');
            var relevantDigits = (day < 30) ? day % 20 : day % 30; // From http://stackoverflow.com/a/24061264
            var daySuffix = (relevantDigits <= 3) ? daySuffixes[relevantDigits] : daySuffixes[0];

            item.published = day + daySuffix + $filter('date')(published, " MMM yyyy 'at' h:mm");
          }

          return item;
        }

      };

      angular.forEach(items, function(item) {
        item = filters.src(item);
        item = filters.author(item);
        item = filters.published(item);
      });

      return items;
    }

    return {
      loadAllItems : function() {
        return $q.when($http.jsonp(url).then(
          function successCallback(response) {

            var items = response.data.items;

            // Run the returned items through filters
            var filteredItems = filterItems(items);

            return filteredItems;

          },
          function errorCallback(response) {

            $log.debug('jsonp error: ' + response.statusText + ' (' + response.status + ').');
            
          }
        ));
      }
    };
  }

})();
