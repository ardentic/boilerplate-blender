
const gutil = require('gulp-util');
const connect = require('gulp-connect-php');
const portfinder = require('portfinder');
const browserSync = require('browser-sync');
const DefaultRegistry = require('undertaker-registry');

class ConnectPHPTasksRegistry extends DefaultRegistry {
  init (gulp) {
    gulp.task('connect-php', () => {
      const serverPort = gutil.env.port || process.env.PORT || 8000;
      const proxyPort = 9000;

      portfinder.basePort = proxyPort;

      portfinder.getPort((error, port) => {
        const settings = {
          hostname: '0.0.0.0',
          base: gutil.env.documentRoot || process.env.DOCUMENT_ROOT || '.',
          keepalive: false,
          port: port
        };

        browserSync({
          proxy: `0.0.0.0:${port}`,
          port: serverPort,
          open: false
        });

        connect.server(settings);
      });
    });
  }
}

module.exports = new ConnectPHPTasksRegistry();
