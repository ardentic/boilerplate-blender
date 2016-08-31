
import notify from 'gulp-notify';
import config from './config';

export const handleError = function (error) {
  if (!config.production) {
    notify.onError({
      title: 'Blender',
      message: '<%= error.message %>'
    })(error);
  }

  this.emit('end');
};
