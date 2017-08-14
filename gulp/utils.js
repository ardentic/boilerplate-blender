
const notify = require('gulp-notify');
const { globalSettings } = require('./config');

const handleError = function (error) {
  if (!globalSettings.production) {
    notify.onError({
      title: 'Blender',
      message: '<%= error.message %>'
    })(error);
  }

  this.emit('end');
};

module.exports = {
  handleError: handleError
};
