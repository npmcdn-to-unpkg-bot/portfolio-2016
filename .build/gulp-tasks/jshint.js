// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.scripts;

// JSHint /////////////////////////////////////////////////////////////////////
// JS error checking.  Will check the main app file for errors.
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.appMain )
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter( plugins.jshintStylish ));
  };
};
