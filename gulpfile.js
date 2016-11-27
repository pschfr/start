var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var htmlmin   = require('gulp-htmlmin');
gulp.task('js', function() {
	return gulp.src('src/script.js').pipe(uglify()).pipe(gulp.dest('dist/'));
});
gulp.task('css', function () {
	return gulp.src('src/style.css').pipe(uglifycss()).pipe(gulp.dest('dist/'));
});
gulp.task('html', function() {
	return gulp.src('src/index.html').pipe(htmlmin()).pipe(gulp.dest('dist/'));
});
