//dependencies
var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // run a local version with livereload (it will automatiucally reload the page when you change something on your code)
var ghPages = require('gulp-gh-pages');
var htmlmin = require('gulp-htmlmin'); // minify html
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify'); //minify js
var image = require('gulp-image');



// task to minify your html
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'))
});

// taks to minify css
gulp.task('css', function () {
    gulp.src('assets/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('copy', function () {
    gulp.src('assets/fonts/**/*')
        .pipe(gulp.dest('dist/assets/fonts'));
    gulp.src('assests/fonts/fontawesome')
        .pipe(gulp.dest('dist/assets/fonts/fontawesome'));
});

gulp.task('compress', function () {
    gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src('assets/js/ie/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js/ie'));
});

gulp.task('imageMin', function () {
    gulp.src('images/*')
        .pipe(image())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});


gulp.task('run', function () {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('build', ['html', 'css', 'copy', 'compress', 'imageMin']);
