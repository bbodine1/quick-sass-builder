var gulp        		= require('gulp');
var browserSync 		= require('browser-sync').create();
var sass        		= require('gulp-sass');
var sourcemaps 			= require('gulp-sourcemaps');
var autoprefixer 		= require('gulp-autoprefixer');
var imagemin		 		= require('gulp-imagemin');
var plumber 				= require('gulp-plumber');
var del         		= require('del');
var runSequence 		= require('run-sequence');

const reload = browserSync.reload;
const stream = browserSync.stream;

// Project Configurations
var paths = {
	src: 						'app',  // Location of the source files
	dist: 					'build' // Location or the build files
};
var servebuild = 	'dev'; // Set which build the server uses. Options (dev, prod)




// Default task
gulp.task('default', ['serve']); // Options (serve, dev, prod)






//// BUILDS - setup the sequence of tasks
//////////////////////////////////////////////////////////

// DEV - Build the project for development
gulp.task('dev', function(){
	runSequence('clean',['html', 'img', 'js', 'sass']);
});

// PROD - Build the project for production
gulp.task('prod', function(){
	runSequence('clean',['html', 'sass']);
});








//// MAIN GULP TASKS - these tasks do something
//////////////////////////////////////////////////////////

// CLEAN - Remove the build folder and start clean
gulp.task('clean', function(){
	del([ paths.dist ]);
});


// HTML - Copy html files to the build directory
gulp.task('html', function() {
	gulp.src( paths.src + '/**/*.html')
	.pipe(gulp.dest( paths.dist ));
});


// SASS - Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	gulp.src( paths.src + '/assets/scss/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
  	.pipe(sass())
		.pipe(autoprefixer())
  	.pipe(sourcemaps.write())
    .pipe(gulp.dest( paths.dist ))
    .pipe(browserSync.stream());
});


// JS - Copy javascript custom file to the build directory
gulp.task('js', function() {
	gulp.src( paths.src + '/assets/js/custom.js')
	.pipe(gulp.dest( paths.dist ));
});


// IMG - Copy image file to the build directory
gulp.task('img', function() {
	gulp.src( paths.src + '/assets/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest( paths.dist + '/img' ));
});


// SERVE - Static Server + watching scss/html files
gulp.task('serve', [servebuild], function() {

  browserSync.init({
      server: './' + paths.dist
  });

  gulp.watch([ paths.src + '/**/*.html'], ['html', reload]);
  gulp.watch([ paths.src + '/assets/scss/**/*.scss'], ['sass']);
  gulp.watch([ paths.src + '/assets/img/**/*'], ['img', reload]);
  gulp.watch([ paths.src + '/assets/js/**/*'], ['js', reload]);
});

//////////////////////////////////////////////////////////
