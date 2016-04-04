
import _ from 'lodash';
import gulp from 'gulp';
import chalk from 'chalk';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import watchify from 'watchify';
import babelify from 'babelify';
import filter from 'gulp-filter';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import envify from 'envify/custom';
import browserify from 'browserify';
import { reload } from 'browser-sync';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import stripDebug from 'gulp-strip-debug';

import config from '../config';
import { handleError } from '../utils';

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
