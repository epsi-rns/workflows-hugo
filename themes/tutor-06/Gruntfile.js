module.exports = function(grunt) {
  // configure the tasks
  let config = {
    //  Sass
    sass: {
      // Task
      expanded: {
        // Target options
        options: {
          outputStyle: 'expanded',
          loadPath: 'sass',
          sourcemap: false
        },
        files: {
          'static/css/materialize.css': 'sass/css/materialize.scss',
          'static/css/main.css': 'sass/css/main.scss',
        }
      },

      min: {
        options: {
          outputStyle: 'compressed',
          loadPath: 'sass',
          sourcemap: false
        },
        files: {
          'static/css/materialize.min.css': 'sass/css/materialize.scss',
          'static/css/main.min.css': 'sass/css/main.scss',
        }
      }
    },

    // PostCss Autoprefixer
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: [
              'last 2 versions',
              'Chrome >= 30',
              'Firefox >= 30',
              'ie >= 10',
              'Safari >= 8'
            ]
          })
        ]
      },
      expanded: {
        src: 'css/materialize.css'
      },
      min: {
        src: 'css/materialize.min.css'
      }
    },

    //  Clean
    clean: {
      temp: {
        src: ['temp/']
      }
    },

    //  Watch Files
    watch: {
      sass: {
        files: ['sass/**/*'],
        tasks: ['release'],
        options: {
          interrupt: false,
          spawn: false
        }
      }
    }

  };

  grunt.initConfig(config);

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-postcss');

  // define the tasks
  grunt.registerTask('release', [
    'sass:expanded',
    'sass:min',
    'postcss:expanded',
    'postcss:min',
    'clean:temp'
  ]);

};
