
'use strict';

var config = require('../config'),
  gulp = require('gulp'),
  del = require('del');

gulp.task('clean', function (callback) {
  del(config.clean.src, callback);
});
