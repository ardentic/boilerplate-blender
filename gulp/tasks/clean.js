
import del from 'del';
import gulp from 'gulp';

import config from '../config';

gulp.task('clean', (callback) => {
  return del(config.clean.src, callback);
});
