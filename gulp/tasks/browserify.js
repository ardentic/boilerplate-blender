
var _ = require('lodash'),
  gulp = require('gulp'),
  chalk = require('chalk'),
  gulpif = require('gulp-if'),
  gutil = require('gulp-util'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  buffer = require('vinyl-buffer'),
  envify = require('envify/custom'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  stripDebug = require('gulp-strip-debug');

var utils = require('../utils'),
  config = require('../config');

var defaults = {
  entries: ['./' + config.scripts.src],
  extensions: ['.js', '.jsx'],
  debug: !config.production
};

var options = _.assign({}, watchify.args, defaults);

var compile = function (watch) {
  var bundler = browserify(options);

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(envify(process.env))
    .transform(babelify.configure({
      ignore: /(bower_components)|(node_modules)/
    }));

  var rebundle = function () {
    return bundler
      .bundle()
      .on('error', utils.handleError)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulpif(config.production, stripDebug()))
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulp.dest(config.scripts.dest));
  };

  if (watch) {
    bundler.on('update', function () {
      var output = 'Starting \'' +
        chalk.cyan('watchify') +
        '\'... ';

      gutil.log(output);

      rebundle();
    });

    bundler.on('time', function (time) {
      var output = 'Finished \'' +
        chalk.cyan('watchify') +
        '\' after ' +
        chalk.magenta((Math.round(time / 10) / 100) + ' s');

      gutil.log(output);
    });
  }

  return rebundle();
};

var watch = function () {
  return compile(true);
};

gulp.task('browserify', function () {
  return compile();
});

gulp.task('watchify', ['lint'], function () {
  return watch();
});
