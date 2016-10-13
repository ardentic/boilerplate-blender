
const changed = require('gulp-changed');
const DefaultRegistry = require('undertaker-registry');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

class ImagesTasksRegistry extends DefaultRegistry {
  init (gulp) {
    gulp.task('images', () => {
      return gulp.src(taskSettings.images.src)
        .pipe(changed(taskSettings.images.dest))
        .pipe(gulp.dest(taskSettings.images.dest))
        .on('error', handleError);
    });

    gulp.task('watch-images', () => {
      return gulp.watch(taskSettings.images.search, gulp.series('images'));
    });
  }
}

module.exports = new ImagesTasksRegistry();
