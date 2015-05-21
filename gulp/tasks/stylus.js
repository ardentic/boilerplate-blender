
'use strict';

var config = require('../config'),
  utils = require('../utils'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  minify = require('gulp-minify-css'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('stylus', function () {
  var settings = {
    stylus: {
      compress: false,
      'include css': true,

      paths: [
        'bower_components',
        'node_modules'
      ],

      import: [
        'normalize.css/normalize.css'
      ]
    },

    autoprefixer: {
      browsers: ['last 5 versions', '> 1%', 'ie 9']
    }
  };

  return gulp
    .src(config.styles.src)
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(stylus(settings.stylus))
    .on('error', utils.handleError)
    .pipe(autoprefixer(settings.autoprefixer))
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulpif(config.production, minify()))
    .pipe(gulp.dest(config.styles.dest));
});
