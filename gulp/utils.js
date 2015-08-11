
var notify = require('gulp-notify');
var config = require('./config');

module.exports = {
  handleError: function (error) {
    if (!config.production) {
      notify.onError({
        title: 'Blender',
        message: '<%= error.message %>'
      })(error);
    }

    this.emit('end');
  }
};
