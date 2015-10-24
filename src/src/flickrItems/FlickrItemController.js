(function(){

  angular
       .module('flickrItems')
       .controller('FlickrItemController', [
          'flickrItemService', '$mdSidenav', '$mdBottomSheet', '$log', '$http', '$q',
          FlickrItemController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function FlickrItemController( itemService, $mdSidenav, $mdBottomSheet, $log, $http, $q) {
    var self = this;

    self.selected     = null;
    self.items        = [ ];
    self.selectItem   = selectItem;
    self.toggleList   = toggleList;
    self.showItemDetails  = showItemDetails;

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
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectItem ( item ) {
      self.selected = angular.isNumber(item) ? $scope.items[item] : item;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function showItemDetails($event) {
        var item = self.selected;

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
         * Bottom Sheet controller for the Avatar Actions
         */
        function DetailsPanelController( $mdBottomSheet ) {
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

  }

})();
