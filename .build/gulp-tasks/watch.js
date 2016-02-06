// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.watch;

// Watch //////////////////////////////////////////////////////////////////
// Watches things and fires tasks when they change.  Note that the tasks in
// question have to first be loaded before calling this one.
module.exports = function ( gulp, plugins ) {
  return function () {
    gulp.watch( paths.scripts, [ 'scripts' ] );
    gulp.watch( paths.styles, [ 'styles' ] );
    gulp.watch( paths.icons, [ 'icons' ] );
    gulp.watch( paths.svgs, [ 'svgmin' ] );
    gulp.watch( paths.images, [ 'imagemin' ] );
    gulp.watch( paths.templates, [ 'riot-tags' ] );
  };
};
