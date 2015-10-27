module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),       // Read in package variable from package.json

    // Construct a banner containing package and build information
    banner: '/* <%= pkg.name %> | <%= pkg.url %> | <%= pkg.license %>\n' +
            ' * <%= pkg.author %> | <%= pkg.contact %>\n' +
            ' */\n',

    filename: '<%= pkg.name %>',

    dependencyName: 'angular-package',

    s: 'src/',  // The source directory
    d: 'app/',  // The distributable directory, where built files will end up
    t: 'test/', // The test directory, for unit test files/specs

    angularFiles: [
      '<%=s%>bower_components/angular/angular.js',
      '<%=s%>bower_components/angular-animate/angular-animate.js',
      '<%=s%>bower_components/angular-aria/angular-aria.js',
      '<%=s%>bower_components/angular-material/angular-material.js',
      '<%=s%>bower_components/angular-sanitize/angular-sanitize.js'
    ],

    angularFilesForTests: [
      '<%=s%>bower_components/angular/angular.js',
      '<%=s%>bower_components/angular-animate/angular-animate.js',
      '<%=s%>bower_components/angular-aria/angular-aria.js',
      '<%=s%>bower_components/angular-material/angular-material.js',
      '<%=s%>bower_components/angular-sanitize/angular-sanitize.js',
      '<%=s%>bower_components/angular-mocks/angular-mocks.js'
    ],

    appFiles: [
      '<%=s%>app/js/flickrItems/FlickrItems.js',
      '<%=s%>app/js/flickrItems/FlickrItemController.js',
      '<%=s%>app/js/flickrItems/FlickrItemFilters.js',
      '<%=s%>app/js/flickrItems/FlickrItemService.js'   
    ],

    /**
     * Jasmine unit test setup. Includes Istanbul code coverage setup with Coveralls-friendly output
     */
    jasmine: {
      src: '<%= appFiles %>',
      options: {
        vendor: '<%= angularFilesForTests %>',    
        specs: ['<%=t%>test-helpers.js', '<%=t%>**/*.js'],
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'coverage/coverage.json',
          report: [
            { type: 'lcov', options: { dir: 'coverage' }},      // Create .lcov report, required by Coveralls
            { type: 'html', options: { dir: 'coverage/html' }}, // Create an html report, readable by humans
            { type: 'text-summary' }                            // Output results to console post-build
          ],
          thresholds: {
            statements: 70,
            branches: 70,
            functions: 50,
            lines: 70
          }
        }
      }
    },

    /**
     * JSHint static analysis setup
     */
    jshint: {
      files: ['gruntfile.js', '<%=s%>src/**/*.js', '<%=t%>**/*.js'], // Analyse this file and all source and test files for errors
      options: {
        browser: true, // Assume general browser globals
        globals: {
          predef: []   // Any global variables go here, if required 
        }
      }
    },

    /**
     * Less setup
     */
    less: {
      dev: {
        options: {
            paths: ['<%= s %>less/**/*.less'] // Process all Less files in Less folder
        },
        files: {
          "<%= s %>assets/app.css": "<%= s %>less/_styles.less",    // Build app.css based on _styles.less
        }
      },
      build: {
        options: {
            paths: ['<%= s %>less/**/*.less'], // Process all Less files in Less folder
            compress: true
        },
        files: {
          "<%= d %>css/app.min.css": "<%= s %>less/_styles.less" // Build app.min.css version for build
        }
      }
    },

    /**
     * Watch setup. The configured tasks will run when JSHint or Less source files are changed
     */
    watch: {
      files: ['<%= jshint.files %>', '<%= less.dev.options.paths %>'],
      tasks: ['less', 'jshint', 'jasmine']
    },

    /**
     * Coveralls setup. Tells Coveralls where to find code coverage information
     */
    coveralls: {
      options: {
        force: true
      },
      src: 'coverage/lcov.info'
    },

    /**
     * Copy setup
     */
    copy: {
      angular: {
        files: [
          // Angular JS files
          {
            flatten: true,
            expand: true,
            cwd: '<%= s %>bower_components',
            src: '*/*.min.js',
            dest: '<%= d %>js',
            filter: 'isFile'
          },
          // Angular Material CSS file
          {
            src: '<%= s %>bower_components/angular-material/angular-material.min.css',
            dest: '<%= d %>css/angular-material.min.css',
            filter: 'isFile'
          }
        ]
      },
      app: {
        files: [
          // App JS files
          {
            flatten: true,
            expand: true,
            cwd: '<%= s %>app/js/flickrItems',
            src: '*.js',
            dest: '<%= d %>js/flickrItems',
            filter: 'isFile'
          },
          // App view files
          {
            expand: true,
            cwd: '<%= s %>app/js/flickrItems/view',
            src: '*.html',
            dest: '<%= d %>js/flickrItems/view',
            filter: 'isFile'
          }
        ]
      },
      // SVG assets
      svg: {
        files: [
          {
            expand: true,
            cwd: '<%= s %>assets/svg',
            src: '**/*',  
            dest: '<%= d %>svg',
            filter: 'isFile'
          }
        ]
      }
    },

    /**
     * Process HTML step. Replaces sections of index.html to create a production copy
     */
    processhtml: {
      options: {
        data: {
          message: 'Hello world!'
        }
      },
      build: {
        files: {
          'index.html': ['<%= s %>index.html'] // Create index.html in root to enable easy publication to GitHub Pages
        }
      }
    }

  });

  // Load tasks in this order
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');

  // Register test and build tasks.These can be run from the command line with "grunt test" or "grunt build"
  // "grunt watch" should be run while developing to notify you when things go wrong
  grunt.registerTask('test', ['jshint', 'jasmine', 'coveralls']);
  grunt.registerTask('build', ['copy', 'processhtml', 'jshint', 'jasmine', 'coveralls']);

};