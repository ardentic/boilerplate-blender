
const _ = require('lodash');
const gulp = require('gulp');
const chalk = require('chalk');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const watchify = require('watchify');
const babelify = require('babelify');
const filter = require('gulp-filter');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const envify = require('envify/custom');
const browserify = require('browserify');
const { reload } = require('browser-sync');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const stripDebug = require('gulp-strip-debug');

const config = require('../config');
const { handleError } = require ('../utils');

let entries = config.scripts.src
  .map(path => './' + path);

let defaults = {
  extensions: ['.js', '.jsx'],
  debug: !config.production,
  entries: entries
};

let options = _.assign({}, watchify.args, defaults);

let compile = (watch) => {
  let bundler = browserify(options);

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(envify(process.env))
    .transform(babelify.configure({
      ignore: /(bower_components)|(node_modules)/
    }));

  let rebundle = () => {
    return bundler
      .bundle()
      .on('error', handleError)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulpif(!config.production, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(config.production, stripDebug()))
      .pipe(gulpif(config.production, uglify()))
      .pipe(gulpif(!config.production, sourcemaps.write('.')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(filter('**/*.js'))
      .pipe(reload({ stream: true }));
  };

  if (watch) {
    bundler.on('update', () => {
      gutil.log(`Starting '${chalk.cyan('watchify')}'...`);
      rebundle();
    });

    bundler.on('time', (time) => {
      let seconds = (Math.round(time / 10) / 100) + ' s',
        taskName = chalk.cyan('watchify'),
        taskTime = chalk.magenta(seconds);

      gutil.log(`Finished '${taskName}' after ${taskTime}`);
    });
  }

  return rebundle();
};

let watch = () => {
  return compile(true);
};

gulp.task('browserify', () => {
  return compile();
});

gulp.task('watchify', () => {
  return watch();
});
