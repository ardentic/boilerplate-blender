
const gulp = require('gulp');
const changed = require('gulp-changed');

const config = require('../config');
const { handleError } = require('../utils');

gulp.task('fonts', () => {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .on('error', handleError);
});
