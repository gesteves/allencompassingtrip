'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/vendor/*.js', 'js/*.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'build/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        node: true,
        curly: true,
        eqeqeq: true,
        indent: 2,
        quotmark: 'single',
        unused: true,
        trailing: true,
        smarttabs: true,
        eqnull: true,
        browser: true,
        globalstrict: true,
        globals: {
          jQuery: true,
          _: true,
          Modernizr: true,
          Chorus: true,
          Unison: true
        },
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    aws: grunt.file.readJSON('grunt-aws.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: 'public-read'
      },
      dist: {
        upload: [
          {
            rel: 'build',
            src: 'build/**/*',
            dest: '/'
          }
        ]
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'sass/*.scss'],
      tasks: ['jshint', 'concat', 'uglify', 'compass', 's3']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'compass', 's3']);
};