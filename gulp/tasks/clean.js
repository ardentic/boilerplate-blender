
const del = require('del');
const gulp = require('gulp');

const config = require('../config');

gulp.task('clean', (callback) => {
  return del(config.clean.src, callback);
});
