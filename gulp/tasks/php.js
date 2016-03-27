
import gulp from 'gulp';
import gutil from 'gulp-util';
import portfinder from 'portfinder';
import browserSync from 'browser-sync';
import connect from 'gulp-connect-php';

gulp.task('php', () => {
  console.log(gutil.env);
  let serverPort = 8000 || gutil.env.port;
  let proxyPort = 9000;

  let settings = {
    hostname: '0.0.0.0',
    base: gutil.env.base || 'public',
    port: server,
    keepalive: false
  };

  portfinder.basePort = 8040;

  portfinder.getPort(function (err, port) {
    console.log(err);
    console.log(port);
  });

  /*browserSync({
    proxy: '0.0.0.0:9000',
    open: false,
    port: gutil.env.port || 8000
  });*/

  connect.server(settings);
});
