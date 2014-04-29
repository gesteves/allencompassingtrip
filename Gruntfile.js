'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/vendor/*.js', 'src/*.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
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
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'concat', 'uglify']
    },
    compass: {
      compile: {
        options: {
          config: 'config.rb'
        }
      },
      watch: {
        options: {
          config: 'config.rb',
          watch: true
        }
      }
    },
    concurrent: {
      target: {
        tasks: ['compass:watch', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['concurrent:target']);
  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'compass:compile']);
};