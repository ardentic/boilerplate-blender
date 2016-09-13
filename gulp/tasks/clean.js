
import del from 'del';
import gulp from 'gulp';

import { taskSettings } from '../config';

gulp.task('clean', (callback) => {
  return del(taskSettings.clean.src, callback);
});
