
var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  stylus = require('gulp-stylus'),
  postcss = require('gulp-postcss'),
  cssnano = require('gulp-cssnano'),
  mqpacker = require('css-mqpacker'),
  autoprefixer = require('autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  fontWeights = require('postcss-font-weights');

var utils = require('../utils'),
  config = require('../config');

gulp.task('stylus', function () {
  var settings = {
    stylus: {
      compress: false,
      'include css': true,

      paths: [
        'node_modules'
      ],

      import: [
        'normalize.css/normalize.css',
        '@ardentic/stylus-jiggers/jiggers',
        '@ardentic/stylus-mq/mq'
      ]
    },

    processors: [
      autoprefixer({ browsers: ['last 5 versions', '> 1%', 'ie 9'] }),
      mqpacker({ sort: true }),
      fontWeights()
    ]
  };

  return gulp
    .src(config.styles.src)
    .pipe(gulpif(!config.production, sourcemaps.init()))
    .pipe(stylus(settings.stylus))
    .on('error', utils.handleError)
    .pipe(postcss(settings.processors))
    .on('error', utils.handleError)
    .pipe(gulpif(!config.production, sourcemaps.write()))
    .pipe(gulpif(config.production, cssnano()))
    .pipe(gulp.dest(config.styles.dest));
});
