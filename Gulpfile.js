
var gutil           = require('gulp-util'),
    sass            = require('gulp-sass'),
    gulp            = require('gulp'),
    browserify      = require('gulp-browserify'),
    concat          = require('gulp-concat'),
    embedlr         = require('gulp-embedlr'),
    refresh         = require('gulp-livereload'),
    lrserver        = require('tiny-lr')(),
    express         = require('express'),
    livereload      = require('connect-livereload'),
    livereloadport  = 35729,
    serverport      = 8080;
 
// server --------------------------------- //

var server = express();

server.use(livereload({
  port: livereloadport
}));

server.use(express.static('./build'));

gulp.task('serve', function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
});


// main tasks ------------------------------ //

gulp.task('styles', function(){
  gulp.src('./app/sass/application.scss')
    .pipe(sass({sourceComments: 'map'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(refresh(lrserver));
});

gulp.task('scripts', function(){
  gulp.src(['./app/js/app.js'])
    .pipe(browserify({
      debug: true,
      transform: [ 'reactify' ]
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(refresh(lrserver));
});
 
gulp.task('html', function(){
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./build/'))
    .pipe(refresh(lrserver));
});
 
gulp.task('assets', function(){
  gulp.src('./app/assets/**/*')
    .pipe(gulp.dest('./build/assets/'))
    .pipe(refresh(lrserver));
});
 

// watch ---------------------------------- //
 
gulp.task('watch', function() {
 
  gulp.watch('app/sass/**', ['styles']);
  gulp.watch('app/js/**', ['scripts']);
  gulp.watch('app/assets/**', ['assets']);
  gulp.watch('app/index.html', ['html']);

});

// build ---------------------------------- //

gulp.task('build', ['html', 'scripts', 'styles', 'assets']);

// gulp ---------------------------------- //
 
gulp.task('default', ['scripts', 'styles', 'html', 'assets', 'serve', 'watch']);




