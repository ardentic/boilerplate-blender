
const del = require('del');
const DefaultRegistry = require('undertaker-registry');

const { taskSettings } = require('../config');

class CleanTasksRegistry extends DefaultRegistry {
  init (gulp) {
    gulp.task('clean', (done) => del(taskSettings.clean.src, done));
  }
}

module.exports = new CleanTasksRegistry();
