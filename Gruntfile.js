'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/vendor/*.js', 'js/*.js'],
        dest: 'build/js/main.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'build/js/main.min.js': ['<%= concat.dist.dest %>']
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
        },
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/stylesheets/main.css': 'sass/main.scss'
        }
      }
    },
    autoprefixer: {
      single_file: {
        src: 'build/stylesheets/main.css',
        dest: 'build/stylesheets/main.css'
      }
    },
    aws: grunt.file.readJSON('grunt-aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.key %>',
        secretAccessKey: '<%= aws.secret %>',
        bucket:'<%= aws.bucket %>'
      },
      build: {
        cwd: 'build/',
        src: '**'
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5,
        title: 'All-Encompassing Trip',
        success: true,
        duration: 3
      }
    },
    watch: {
      files: ['<%= jshint.files %>', 'sass/*.scss', 'sass/*/*.scss'],
      tasks: ['jshint', 'concat', 'sass', 'autoprefixer', 'uglify', 's3']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-notify');

  grunt.task.run('notify_hooks');

  grunt.registerTask('default', 'watch');
  grunt.registerTask('build', ['jshint', 'concat', 'sass', 'autoprefixer', 'uglify', 's3']);
};