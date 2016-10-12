
const del = require('del');
const gulp = require('gulp');

const { taskSettings } = require('../config');

gulp.task('clean', (callback) => {
  return del(taskSettings.clean.src, callback);
});
