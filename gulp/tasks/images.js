
const gulp = require('gulp');
const changed = require('gulp-changed');

const config = require('../config');
const { handleError } = require('../utils');

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest))
    .pipe(gulp.dest(config.images.dest))
    .on('error', handleError);
});
