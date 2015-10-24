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

    var items = [];

    return {
      loadAllItems : function() {
        return $q.when($http.jsonp(url).then(
          function successCallback(response) {

            items = response.data.items;
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
