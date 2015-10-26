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

    appFiles: [
      '<%=s%>src/flickrItems/FlickrItems.js',
      '<%=s%>src/flickrItems/FlickrItemController.js',
      '<%=s%>src/flickrItems/FlickrItemService.js'
    ],

    /**
     * Uglification (minification) setup. Uglified files are built to the path defined by the d variable and get a .min suffix
     */
    uglify: {
      dependencies: {
        files: {
          '<%= d %>js/<%= dependencyName %>.min.js': '<%= angularFiles %>'
        }
      },
      app: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          '<%= d %>js/<%= filename %>.min.js': '<%= appFiles %>'
        }   
      }
    },

    /**
     * Jasmine unit test setup. Includes Istanbul code coverage setup with Coveralls-friendly output
     */
    jasmine: {
      src: '<%= uglify.app.files %>',
      options: {
        vendor: [
            '<%=s%>bower_components/angular/angular.js',
            '<%=s%>bower_components/angular-animate/angular-animate.js',
            '<%=s%>bower_components/angular-aria/angular-aria.js',
            '<%=s%>bower_components/angular-material/angular-material.js',
          ],    
        specs: '<%=t%>**/*.js',
        template: require('grunt-template-jasmine-istanbul'),
        templateOptions: {
          coverage: 'coverage/coverage.json',
          report: [
            { type: 'lcov', options: { dir: 'coverage' }},      // Create .lcov report, required by Coveralls
            { type: 'html', options: { dir: 'coverage/html' }}, // Create an html report, readable by humans
            { type: 'text-summary' }                            // Output results to console post-build
          ],
          thresholds: {
            // Test result thresholds all set to 0 to begin with. Commented values are suggestions
            lines: 0, // 75
            statements: 0, // 75
            branches: 0, // 75
            functions: 0 // 75
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
            paths: ['<%= s %>less/**/*.less'], // Process all Less files in Less folder
        },
        files: {
          "<%= s %>assets/app.css": "<%= s %>less/_styles.less" // Build app.css based on _styles.less
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
      },
      css: {
        files: [
          {
            expand: true,
            cwd: '<%= s %>assets',
            src: '*.css',  
            dest: '<%= d %>css',
            filter: 'isFile'
          }
        ]
      }
    },

  });

  // Load tasks in this order
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register test and build tasks.These can be run from the command line with "grunt test" or "grunt build"
  // "grunt watch" should be run while developing to notify you when things go wrong
  grunt.registerTask('test', ['jshint', 'jasmine', 'coveralls']);
  grunt.registerTask('build', ['jshint', 'jasmine', 'copy', 'uglify']);

};