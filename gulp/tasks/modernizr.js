
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const modernizr = require('gulp-modernizr');
const DefaultRegistry = require('undertaker-registry');

const { handleError } = require('../utils');
const { globalSettings, taskSettings } = require('../config');

class CleanTasksRegistry extends DefaultRegistry {
  init (gulp) {
    const sources = taskSettings.modernizr.src.map((source) => `./${source}`);

    gulp.task('modernizr', () => gulp
      .src(sources)
      .on('error', handleError)
      .pipe(modernizr(taskSettings.modernizr.args))
      .pipe(gulpif(globalSettings.production, uglify()))
      .pipe(concat('modernizr-custom.js'))
      .pipe(gulp.dest(taskSettings.modernizr.dest))
    );
  }
}

module.exports = new CleanTasksRegistry();
