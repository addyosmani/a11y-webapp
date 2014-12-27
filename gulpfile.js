/**
 * A11y Web Accessibility Web App
 *
 * Front-end Setup
 * ===================
 *
 * This application uses Express and Polymer. Run `gulp`
 * to fire up the watch task so you can develop and test against
 * localhost on port 3000.
 *
 * Due to the need for us to use Vulcanize for production, while
 * developing you will use localhost:3000/source.html for editing
 * the application. This reads in the main elements used from the
 * /components directory.
 *
 * To prepare the app for production, run `gulp vulcanize`. This
 * will vulcanize source.html -> index.html so that Express serves
 * up the optimized app at localhost:3000 / any server that the app
 * gets pushed to.
 *
 * Front-end assets should be placed inside the public directory. 
 *
 * Back-end Setup
 * ====================
 *
 * As mentioned, we're using Express. app/controllers/home.js is 
 * where we directly use the A11y module to perform audits. It's 
 * also where the bulk of routing occurs. We do have Jade templates
 * setup in app/views however these are mostly left behind from an
 * older refactor in case we decide to provide an alternative front-end.
 *
 * Deployment
 * ====================
 *
 * This application is hosted on https://a11y-api.herokuapp.com/. To
 * push your work, `git push heroku master` to update. If you notice the
 * build isn't working, check your heroku logs for further information.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var vulcanize = require('gulp-vulcanize');
var rename = require('gulp-rename');

gulp.task('sass', function () {
  gulp.src('./public/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('vulcanize', function() {
    var DEST_DIR = 'public';
    return gulp.src('public/source.html')
        .pipe(vulcanize({
            dest: DEST_DIR,
            strip: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(DEST_DIR));
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed();
    }, 500);
  });
});

gulp.task('default', [
  'sass',
  'develop',
  'watch'
]);
