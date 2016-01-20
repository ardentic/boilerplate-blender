
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

var paths = ['node_modules']
  .concat(config.scripts.paths)
  .map(path => './' + path);

var entries = config.scripts.src
  .map(path => './' + path);

var defaults = {
  extensions: ['.js', '.jsx'],
  debug: !config.production,
  entries: entries,
  paths: paths
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
      gutil.log(`Starting '${chalk.cyan('watchify')}'...`);
      rebundle();
    });

    bundler.on('time', function (time) {
      var seconds = (Math.round(time / 10) / 100) + ' s',
        taskName = chalk.cyan('watchify'),
        taskTime = chalk.magenta(seconds);

      gutil.log(`Finished '${taskName}' after ${taskTime}`);
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
