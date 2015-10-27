(function() {
  'use strict';

  angular.module('flickrItems')

    // Adds a high-res src attribute to an item, based on that item's media.m property
    .filter('itemSrc', function() {

      return function(item) {

        // Do not process items with malformed or missing media properties
        if (typeof item.media !== 'object' || typeof item.media.m !== 'string') {
          return item;
        }

        // Get the last six characters from the media.m property for comparison
        var media = item.media.m;
        var fileEnding = media.slice(-6);

        // If it ends in '_m.jpg', remove the '_m' part to create a link to a higher-res version
        if (fileEnding === '_m.jpg') {
          var src = media.substring(0, media.length - 6) + media.slice(-4);
          item.src = src;
        }
        else {
          item.src = item.media.m;
        }

        return item;

      };

    })

    // Removes the default Flickr email prefix and suffix from an item's author property
    .filter('itemAuthor', function() {

      return function(item) {

        // Do not process items with malformed or missing author properties
        if (typeof item.author !== 'string') {
          return item;
        }

        // Get the start of the item's author, based on the length of the prefix we're looking for
        var authorPrefix = 'nobody@flickr.com (';
        var authorStart = item.author.substring(0, authorPrefix.length);

        // If it matches, remove the prefix and the last character from the author property
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

        // Do not process items with malformed or missing link properties
        if (typeof item.link !== 'string') {
          return item;
        }

        var authorLink = item.link;

        // Remove the last slug from the URL
        if (item.link.slice(-1) === "/") {
          authorLink = authorLink.substring(0, authorLink.length - 1);
          authorLink = authorLink.substr(0, authorLink.lastIndexOf("/"));
          authorLink += '/';

          item.authorLink = authorLink;
        }

        return item;

      };

    })

    // Transforms an item's published property into a readable representation
    // in the form '8th Apr 2012 at 12:00'
    .filter('itemPublished', function($filter) {

      return function(item) {

        var published = new Date(item.published);

        if (typeof published.getMilliseconds === 'function') {
          // Date suffix solution adapted from http://stackoverflow.com/a/24061264
          var daySuffixes = ['th', 'st', 'nd', 'rd'];
          var day = $filter('date')(published, 'dd');
          var relevantDigits = (day < 30) ? day % 20 : day % 30;
          var daySuffix = (relevantDigits <= 3) ? daySuffixes[relevantDigits] : daySuffixes[0];

          item.published = day + daySuffix + $filter('date')(published, " MMM yyyy 'at' h:mm");
        }

        return item;

      };

    })

    // Removes unwanted HTML from an item's description property and returns an array of description lines
    .filter('itemDescription', function() {

      return function(item) {

        // Split the description at the start of each p tag, and keep only the last
        var descriptionParts = item.description.split('<p>');
        var description = descriptionParts[descriptionParts.length - 1];

        // Remove closing p tag from remaining element, if it exists
        if (description.slice(-4) === '</p>') {
          description = description.substring(0, description.length - 4);
        }

        var descriptionLines;

        // If the remaining element contains an img tag, it's because there is no description
        // In this case we return an empty array
        if (description.indexOf('<img ') !== -1) {
          descriptionLines = [];
        }
        // Otherwise, we return an array of description lines after splitting on each br tag
        else {
          descriptionLines = description.split('<br />');

          angular.forEach(descriptionLines, function(v, k) {
            var line = descriptionLines[k];
            if (typeof line === 'string') {
              descriptionLines[k] = line.trim();
            }
          });
        }

        item.description = descriptionLines;

        return item;

      };

    })

    // Transforms an item's tags property into an array of tags
    .filter('itemTags', function() {

      return function(item) {

        // Split the item's tag on each space character to create an array
        if (typeof item.tags === 'string') {
          item.tags = (item.tags.length > 0) ? item.tags.split(' ') : [];
        }

        return item;

      };

    });

 })();