
const gulp = require('gulp');
const changed = require('gulp-changed');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

gulp.task('fonts', () => {
  return gulp.src(taskSettings.fonts.src)
    .pipe(changed(taskSettings.fonts.dest))
    .pipe(gulp.dest(taskSettings.fonts.dest))
    .on('error', handleError);
});

gulp.task('watch-fonts', () => {
  return gulp.watch(taskSettings.fonts.search, ['fonts']);
});
