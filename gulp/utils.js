
'use strict';

var config = require('./config'),
  notify = require('gulp-notify');

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
