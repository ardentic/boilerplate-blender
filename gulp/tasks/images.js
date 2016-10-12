
const gulp = require('gulp');
const changed = require('gulp-changed');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

gulp.task('images', () => {
  return gulp.src(taskSettings.images.src)
    .pipe(changed(taskSettings.images.dest))
    .pipe(gulp.dest(taskSettings.images.dest))
    .on('error', handleError);
});

gulp.task('watch-images', () => {
  return gulp.watch(taskSettings.images.search, ['images']);
});
