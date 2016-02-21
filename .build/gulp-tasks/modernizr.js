// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths;

// Modernizr //////////////////////////////////////////////////////////////////
// Create custom build of Modernizr based on tests that are actually in use
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src([paths.scripts.appDist, paths.scripts.appMain, paths.styles.stylesMain ])
      .pipe( plugins.modernizr( 'modernizr.custom.min.js', {
        devFile: paths.bower + 'modernizr/modernizr.js',
        tests: [ 'svg', 'touchevents', 'history']
      }))
      .pipe( plugins.uglify() )
      .pipe( gulp.dest( paths.scripts.custom ));
  };
};
