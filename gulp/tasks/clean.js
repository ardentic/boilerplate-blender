
var del = require('del'),
  gulp = require('gulp');

var config = require('../config');

gulp.task('clean', function (callback) {
  del(config.clean.src, callback);
});
