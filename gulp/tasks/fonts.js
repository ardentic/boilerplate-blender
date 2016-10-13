
const changed = require('gulp-changed');
const DefaultRegistry = require('undertaker-registry');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

class FontsTasksRegistry extends DefaultRegistry {
  init (gulp) {
    gulp.task('fonts', () => {
      return gulp.src(taskSettings.fonts.src)
        .pipe(changed(taskSettings.fonts.dest))
        .pipe(gulp.dest(taskSettings.fonts.dest))
        .on('error', handleError);
    });

    gulp.task('watch-fonts', () => {
      return gulp.watch(taskSettings.fonts.search, gulp.series('fonts'));
    });
  }
}

module.exports = new FontsTasksRegistry();
