// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.assets.images;

// Imagemin ///////////////////////////////////////////////////////////////////
// Minify images for great saving of space.
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.src )
      .pipe( plugins.imagemin() )
      .pipe( gulp.dest( paths.dest ) );
  };
};
