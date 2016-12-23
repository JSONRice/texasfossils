var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');
var Server = require('karma').Server;
var minifyCSS = require('gulp-minify-css');
var merge = require('merge-stream');

var app = 'texasfossils';

// Lint (JSHint) Task
gulp.task('lint', function () {
  return gulp.src([
    './app.js',
    './web/**/*.js'
  ])
    .pipe(jshint()).pipe(jshint.reporter('default'));
});

// Compile Stylesheets
gulp.task('style', function () {
  var lessStream = gulp.src([
    './web/app/less/**/*.less'])
    .pipe(less())
    .pipe(concat('styles.less'));

  var cssStream = gulp.src([
    './web/app/css/**/*.css'])
    .pipe(concat('styles.css'));

  // Combine all style sheet files into one styles.css
  var mergedStream = merge(lessStream, cssStream)
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist'));

  return mergedStream;
});

// Convert Angular templates into a cache file
gulp.task('templates', function () {
  return gulp.src('./web/**/*.html')
    .pipe(templateCache('templates.js', {module: 'texasfossils'}))
    .pipe(gulp.dest('./dist'));
});

// Concatenate JavaScripts
gulp.task('concat', ['templates'], function () {
  return gulp.src([
    './web/app/app_bootstrap.js',
    './web/**/*.js'
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist'));
});

// Minify JavaScripts
gulp.task('minify', ['concat'], function () {
  return gulp.src('./dist/app.js')
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('specs', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// TODO: improve!
// Watch Files For Changes
gulp.task('watch', ['dev'], function () {
  // Let the html templates compile first that way there aren't any load conflicts with the JS
  gulp.watch('web/**/*.html', ['templates']);
  gulp.watch('web/**/*.js', ['concat']);
  gulp.watch('models/*.js', ['concat']);
  gulp.watch('web/assets/**/*.less', ['style']);
  gulp.watch('web/assets/**/*.css', ['style']);
});

// Used for development 'gulp dev'
gulp.task('dev', ['style', 'concat']);

// Runs unit tests
gulp.task('test', ['karma', 'coverage']);

// Used for production 'gulp'
gulp.task('default', ['lint', 'style', 'minify']);
