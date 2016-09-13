
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

import { handleError } from '../utils';
import { globalSettings, taskSettings } from '../config';

const entries = taskSettings.scripts.src.map((path) => {
  return `./${path}`;
});

const defaults = {
  extensions: ['.js', '.jsx'],
  debug: !globalSettings.production,
  entries: entries
};

const options = _.assign({}, watchify.args, defaults);

const compile = (watch) => {
  let bundler = browserify(options);

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(envify(process.env))
    .transform(babelify.configure({ ignore: /(bower_components)|(node_modules)/ }));

  const rebundle = () => {
    return bundler
      .bundle()
      .on('error', handleError)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulpif(!globalSettings.production, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(globalSettings.production, stripDebug()))
      .pipe(gulpif(globalSettings.production, uglify()))
      .pipe(gulpif(!globalSettings.production, sourcemaps.write('.')))
      .pipe(gulp.dest(taskSettings.scripts.dest))
      .pipe(filter('**/*.js'))
      .pipe(reload({ stream: true }));
  };

  if (watch) {
    bundler.on('update', () => {
      gutil.log(`Starting '${chalk.cyan('watchify')}'...`);
      rebundle();
    });

    bundler.on('time', (time) => {
      const seconds = `${Math.round(time / 10) / 100} s`;
      const taskName = chalk.cyan('watchify');
      const taskTime = chalk.magenta(seconds);

      gutil.log(`Finished '${taskName}' after ${taskTime}`);
    });
  }

  return rebundle();
};

const watch = () => {
  return compile(true);
};

gulp.task('browserify', () => {
  return compile();
});

gulp.task('watchify', () => {
  return watch();
});
