var gulp      = require('gulp'),
	sass      = require('gulp-sass')
	concat    = require('gulp-concat'),
	uglify    = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	htmlmin   = require('gulp-htmlmin'),
	watch     = require('gulp-watch');
gulp.task('concatJS', function() { // Concatenates third-party and my JS together
	gulp.src(['src/vendor/jquery-3.3.1.js', 'src/vendor/mousetrap.js', 'src/vendor/unsplash-source.js', 'src/script.js']).pipe(concat('scripts.js')).pipe(gulp.dest('src/'));
});
gulp.task('minJS', ['concatJS'], function() { // Minifies JS, moves to dist
	gulp.src('src/scripts.js').pipe(uglify()).pipe(gulp.dest('dist/'));
});
gulp.task('compileSass', function() { // Compiles CSS from Sass partials
	gulp.src('src/style.sass').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('src/'));
});
gulp.task('minCSS', ['compileSass'], function() { // Minifies CSS, moves to dist
	gulp.src('src/style.css').pipe(uglifycss()).pipe(gulp.dest('dist/'));
});
gulp.task('minHTML', function() { // Minifies HTML, moves to dist
	gulp.src('src/index.html').pipe(htmlmin({collapseWhitespace: true, removeComments: true})).pipe(gulp.dest('dist/'));
});
gulp.task('build', ['minJS', 'minCSS', 'minHTML']); // does it all in order

gulp.task('default', function() { // Watch files for changes, compile if necessary
	gulp.start('build');
	watch('src/index.html', function() {
		gulp.start('minHTML');
	});
	watch('src/style.sass', function() {
		gulp.start('minCSS');
	});
	watch('src/script.js', function() {
		gulp.start('minJS');
	});
});
