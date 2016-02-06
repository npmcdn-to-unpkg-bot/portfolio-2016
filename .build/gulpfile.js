/**
 * It's a gulpfile!  The gulpfile builds things.  Scripts, styles, icons, any
 * other junk that needs building.  Install gulp with:
 * npm install gulp -g
 *
 * And make sure you've got all the dependencies installed with:
 * npm install (from the .build directory)
 *
 * Then run the default task (will watch for changes to files which require
 * gulpification) with simply:
 * gulp
 *
 * Or, run more specific tasks directly as needed:
 * gulp scripts
 * gulp styles
 * gulp svgmin
 * etc.
 */

// Pull in simple utility module which has a few helper functions we need.
var utility = require( './utility' );

// Pull in the top-level gulp package.
var gulp    = require( 'gulp' );

// Load in all of our tasks
var tasks   = utility.loadTasks();

///////////////////////////////////////////////////////////////////////////////
// Scripts ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Create a custom build of Modernizr based on the tests that are actuall in
// use.  Will generate modernizr.custom.min.js file in scripts/custom.  Should
// be included on the page as soon as possible if this is used.
gulp.task( 'modernizr', tasks.modernizr );

// Build vendor.js file.  Will read in all dependencies defined in bower.json
// file and create normal and minified vendor.js file for including.
gulp.task( 'vendors', tasks.vendors );
gulp.task( 'vendor', [ 'vendors' ] ); // Alias.

// Build app.js file from whatever app files are defined in the config.
gulp.task( 'scripts', tasks.scripts );
gulp.task( 'js', [ 'scripts' ] ); // Alias.

// JS error checking.  Will check errors in compiled app.js file.
gulp.task( 'jshint', tasks.jshint );

///////////////////////////////////////////////////////////////////////////////
// Styles /////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Build Sass files, autoprefix the result and create sourcemaps.
gulp.task( 'styles', tasks.styles );
gulp.task( 'css', [ 'styles' ] ); // Alias.

///////////////////////////////////////////////////////////////////////////////
// Assets /////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Icon font generation - packages SVGs into single iconfont sass include.
gulp.task( 'iconfont', tasks.iconfont );
gulp.task( 'icons', [ 'iconfont', 'styles' ] );

// SVG minification - makes SVGs smaller.
gulp.task( 'svgmin', tasks.svgmin );

// Image minification - makes all other formats smaller.
gulp.task( 'imagemin', tasks.imagemin );

// Riot template tag handling.
gulp.task( 'riot-tags', tasks[ 'riot-tags' ] );

///////////////////////////////////////////////////////////////////////////////
// Utility ////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Watch - watches failes for changes and calls appropriate handler task.
// Word of warning here - watch as few files as you can get away with, Watch
// will happily eat all of your CPU if you give it too many files.
gulp.task( 'watch', tasks.watch );

// Livereload - automatically reload browser on changes to styles/scripts.
gulp.task( 'livereload', tasks.livereload );

// PHPCS - PHP codesniffing, will report PSR issues with PHP code if PHP files
// are entered in the paths config.
gulp.task( 'phpcs', tasks.phpcs );

// Init - this should be run the first time this package is installed.  Will
// build the initial base directory structure if needed (but will not run it
// over if already populated).
gulp.task( 'init', tasks.init );

///////////////////////////////////////////////////////////////////////////////
// Dev tasks //////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Build then watch the app.
gulp.task( 'default', [ 'watch', 'livereload' ] );

// Null task - useful when you need the gulpfile to load without doing anything
// The empty string is not just for show.
gulp.task( 'null', [ '' ] );
