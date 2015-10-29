# Flickr Viewr

[![GitHub version](https://badge.fury.io/gh/AndyWhite87%2Fflickr-viewr.svg)](http://badge.fury.io/gh/AndyWhite87%2Fflickr-viewr)
[![Dependency Status](https://david-dm.org/AndyWhite87/flickr-viewr/dev-status.svg)](https://david-dm.org/AndyWhite87/flickr-viewr#info=devDependencies)
[![Build Status](https://travis-ci.org/AndyWhite87/flickr-viewr.svg?branch=master)](https://travis-ci.org/AndyWhite87/flickr-viewr)
[![Coverage Status](https://coveralls.io/repos/AndyWhite87/flickr-viewr/badge.svg?branch=master&service=github)](https://coveralls.io/github/AndyWhite87/flickr-viewr?branch=master)

Flickr Viewr displays the 20 latest images on Flickr that match the tags you search for. Click a photo to view it in high resolution, and click its tags to see related photos.

## Development

### Setup

To download the source and prepare you environment for local development, first make sure Node, Bower and the Grunt CLI are all installed:

- Node: https://nodejs.org/
- Bower: with Node installed, run `npm install -g bower` from a command line
- Grunt CLI: with Node installed, run `npm install -g grunt-cli` from a command line

Then:

0. Fork or clone this repository (https://github.com/AndyWhite87/flickr-viewr.git)
0. Open a command line in your local working directory, and run `npm install`. This will install the required node modules and bower components.

After following the steps above, you're ready to start developing. However, it's advisable to serve the source files even when developing locally, to make sure your local changes reflect behaviour in a live environment. One easy way to do this is with Live Server:

0. If you haven't already, install Live Server globally with `npm install -g live-server`
0. cd into the `src` directory and run `live-server`

Live Server will reload your files whenever a change is made, which is useful for rapid development.

### Grunt tasks

The Flickr Viewr project has several Grunt tasks configured within `gruntfile.js`. The most useful ones to know about are:

#### grunt watch

> You should set this task running before starting to develop locally in order to be notified of any errors in the .less and .js files.

Begins watching all .less files in the `src\less` directory, as well as `gruntfile.js` and all .js files in the `src` and `test` directories. When any of them change, JSHint will run on those files, then any Jasmine specs in the `test` directory will run. JSHint and Jasmine results will be output to the console each time.

#### grunt test

> This task also runs the Coveralls task, which only succeeds when running in Travis CI (see note below).

Runs JSHint on `gruntfile.js` and all files in the `src` and `test` directories, then runs any Jasmine specs in the `test` directory and records code coverage. JSHint and Jasmine results will be output to the console each time, along with code coverage results.

#### grunt build

> Run this task to build the production-ready app.

Runs JSHint, Jasmine and code coverage in the same way as the test task, then compiles .less files to .css and copies static files (images and favicons) into the `dist` directory. Built files appear in a root directory named `app`, except for the built `index.html` file which is output to the root directory.

### * A note on tests, code coverage and continuous integration

The Flickr Viewr project includes a set of tests (in the `test` directory) written in Jasmine (http://jasmine.github.io/). These tests are run as part of the `grunt build` task - any failures will cause the build to fail, meaning that all tests must pass in order for any changes to be committed to the built files.

In addition, code coverage is measured by Istanbul (https://github.com/taichi/grunt-istanbul). Code coverage thresholds are set within `gruntfile.js` If code coverage slips below these thresholds the build will fail.

Finally, the project is configured to run within Travis CI (https://travis-ci.org/) and for code coverage to be monitored by Coveralls (https://coveralls.io/). These services power the **build** and **coverage** badges at the top of this readme, an provide useful feedback to help fix errors and improve code coverage. Visit those sites to enable their services for your own repo - once enabled, they'll process the code each time you push a commit to github.
