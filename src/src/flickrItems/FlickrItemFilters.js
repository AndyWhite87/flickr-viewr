(function() {
  'use strict';

  angular.module('flickrItems')

    // Adds a high-res src attribute to an item, based on that item's media.m property
    .filter('itemSrc', function() {

      return function(item) {

        var media = item.media.m;
        var fileEnding = media.slice(-6);

        if (fileEnding === '_m.jpg') {
          var src = media.substring(0, media.length - 6) + media.slice(-4);
          item.src = src;
        }

        return item;

      };

    })

    // Removes the default Flickr email prefix and suffix from an item's author property
    .filter('itemAuthor', function() {

      return function(item) {

        var authorPrefix = 'nobody@flickr.com (';
        var authorStart = item.author.substring(0, authorPrefix.length);

        if (authorStart === authorPrefix) {
          item.author = item.author.replace(authorPrefix, '');
          item.author = item.author.substring(0, item.author.length - 1);
        }

        return item;

      };

    })

    // Adds an authorLink property to an item based on the item's link property
    .filter('itemAuthorLink', function() {

      return function(item) {

        var authorLink = item.link;

        if (item.link.slice(-1) === "/") {
          authorLink = authorLink.substring(0, authorLink.length - 1);
        }

        item.authorLink = authorLink.substr(0, authorLink.lastIndexOf("/"));

        return item;

      };

    })

    // Transforms an item's published property into a readable representation
    .filter('itemPublished', function($filter) {

      return function(item) {

        var published = new Date(item.published);

        if (typeof published.getMilliseconds === 'function') {
          var daySuffixes = ["th", "st", "nd", "rd"];
          var day = $filter('date')(published, 'dd');
          var relevantDigits = (day < 30) ? day % 20 : day % 30; // From http://stackoverflow.com/a/24061264
          var daySuffix = (relevantDigits <= 3) ? daySuffixes[relevantDigits] : daySuffixes[0];

          item.published = day + daySuffix + $filter('date')(published, " MMM yyyy 'at' h:mm");
        }

        return item;

      };

    });

 })();