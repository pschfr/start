var gulp  = require('gulp');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('js', function() {
	return gulp.src('script.js')
		.pipe(uglify())
		.pipe(gulp.dest('min/'));
});

gulp.task('css', function () {
	return gulp.src('style.css')
		.pipe(uglifycss())
		.pipe(gulp.dest('min/'));
});
