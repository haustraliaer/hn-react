
var gutil       = require('gulp-util'),
    sass        = require('gulp-sass'),
    lr          = require('tiny-lr'),
    http        = require('http'),
    path        = require('path'),
    ecstatic    = require('ecstatic'),
    gulp        = require('gulp'),
    browserify  = require('gulp-browserify'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin');


var tlr = lr();
var livereload = function (evt, filepath) {
  tlr.changed({
  body: {
    files: path.relative(__dirname, filepath)
  }
  });
};


// gulp tasks
 
gulp.task('styles', function () {
  return gulp.src('./assets/sass/styles.scss')
  .pipe(sass())
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('scripts', function () {
  gulp.src(['./assets/js/app.js'])
    .pipe(browserify({
      debug: true,
      transform: [ 'reactify' ]
    }))
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('images', function () {
  gulp.src(['./assets/img/**/*.png', './assets/img/**/*.gif'])
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img/'));
});


// default task

gulp.task('watch', function() {


  http.createServer(ecstatic({root: __dirname})).listen(8080);
  gutil.log(gutil.colors.blue('HTTP server listening on port 8080'));

  tlr.listen(35729);
  gutil.log(gutil.colors.blue('Livereload server listening on port 35729'));

  gulp.watch('assets/sass/**', ['styles'])._watcher.on('all', livereload);
  gulp.watch('assets/js/**', ['scripts'])._watcher.on('all', livereload);
  gulp.watch('assets/img/**', ['images'])._watcher.on('all', livereload);

});

gulp.task('default', [ 'styles', 'scripts', 'images', 'watch' ]);

