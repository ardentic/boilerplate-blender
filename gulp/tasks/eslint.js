
const path = require('path');
const eslint = require('gulp-eslint');
const notifier = require('node-notifier');
const DefaultRegistry = require('undertaker-registry');

const { handleError } = require('../utils');
const { taskSettings } = require('../config');

class EslintTasksRegistry extends DefaultRegistry {
  init (gulp) {
    const lint = () => gulp
      .src(taskSettings.eslint.src)
      .pipe(eslint())
      .on('error', handleError)
      .pipe(eslint.format('stylish'));

    const handleResults = (results) => {
      if (results.errorCount > 0) {
        notifier.notify({
          title: 'Blender',
          message: `Linting errors: ${results.errorCount}`,
          icon: path.join(require.resolve('gulp-notify'), '..', 'assets', 'gulp-error.png'),
          sound: 'Frog'
        });
      }
    };

    gulp.task('eslint', () => lint().pipe(eslint.results(handleResults)));
    gulp.task('test-eslint', () => lint().pipe(eslint.failAfterError()));
    gulp.task('watch-eslint', () => gulp
      .watch(taskSettings.eslint.search, gulp.series('eslint'))
    );
  }
}

module.exports = new EslintTasksRegistry();
