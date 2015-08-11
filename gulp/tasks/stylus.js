
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  stylus = require('gulp-stylus'),
  minify = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer');

var utils = require('../utils'),
  config = require('../config');

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
    .on('error', utils.handleError)
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulpif(config.production, minify()))
    .pipe(gulp.dest(config.styles.dest));
});
