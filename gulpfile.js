var gulp        		= require('gulp');
var browserSync 		= require('browser-sync').create();
var sass        		= require('gulp-sass');
var del         		= require('del');
var runSequence 		= require('run-sequence');

const reload = browserSync.reload;

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

// Build the project for development
gulp.task('dev', function(){
	runSequence('clean',['html', 'sass']);
});

// Build the project for production
gulp.task('prod', function(){
	runSequence('clean',['html', 'sass']);
});








//// MAIN GULP TASKS - these tasks do something
//////////////////////////////////////////////////////////

// Remove the build folder and start clean
gulp.task('clean', function(){
	del([ paths.dist ]);
});


// Copy html files to the build directory
gulp.task('html', function() {
	gulp.src( paths.src + '/**/*.html')
	.pipe(gulp.dest( paths.dist ));
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src( paths.src + '/assets/scss/*.scss')
  	.pipe(sass())
    .pipe(gulp.dest( paths.dist ))
    .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', [servebuild], function() {

  browserSync.init({
      server: './' + paths.dist
  });

  gulp.watch([ paths.src + '/**/*.html'], ['html', reload]);
  gulp.watch([ paths.src + '/assets/scss/**/*.scss'], ['sass']);
});

//////////////////////////////////////////////////////////