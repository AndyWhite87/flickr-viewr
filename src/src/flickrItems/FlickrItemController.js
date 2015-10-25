(function(){

  angular
       .module('flickrItems')
       .controller('FlickrItemController', [
          'flickrItemService', '$mdBottomSheet', '$mdToast', '$log', '$http', '$q',
          FlickrItemController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function FlickrItemController(itemService, $mdBottomSheet, $mdToast, $log, $http, $q) {
    var self = this;
    self.selected         = null;
    self.items            = [ ];
    self.showItemDetails  = showItemDetails;
    self.showTagSearch    = showTagSearch;

    // Load all items
    itemService
      .loadAllItems()
      .then( function( items ) {
        self.items    = [].concat(items);
        self.selected = items[0];
      });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Show the details sheet
     * @param item id
     * @param event
     */
    function showItemDetails(item, $event) {
        self.selected = item;

        return $mdBottomSheet.show({
          parent: angular.element(document.body),
          templateUrl: './src/flickrItems/view/detailsSheet.html',
          controller: [ '$mdBottomSheet', DetailsPanelController],
          controllerAs: "detailsCtrl",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedOption) {
          if (clickedOption) {
            $log.debug( clickedOption.name + ' clicked!');
          }
        });

        /**
         * Bottom Sheet controller for the detail actions
         * @param $mdBottomSheet
         */
        function DetailsPanelController($mdBottomSheet) {
          this.item = item;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.submitContact = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

    /**
     * Show the tags search area
     */
    function showTagSearch() {

      $mdToast.show({
        parent : angular.element(document.querySelector('#toolbar')),
        templateUrl: './src/flickrItems/view/tagsSearch.html',
        controller: [ '$mdToast', TagsSearchController],
        controllerAs: "tagSearchCtrl",
        position: 'top right',
        hideDelay: 0,
      });

      setTimeout(function(){
        document.querySelector('#tags-search-input').focus();
      }, 0);

      /**
       * Toast controller for tags search area
       * @param $mdToast
       */
      function TagsSearchController($mdToast) {
        this.close = function() {
          $mdToast.hide();
        };
      }

    }
  }

})();
