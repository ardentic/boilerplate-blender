
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

const { handleError } = require('../utils');
const { taskSettings, globalSettings } = require('../config');

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
