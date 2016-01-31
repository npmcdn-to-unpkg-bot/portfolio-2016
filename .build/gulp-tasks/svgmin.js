// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.assets.svgs;

// SVG minifier ///////////////////////////////////////////////////////////////
// Cuts all the crap out of SVGs
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.src )
      .pipe( plugins.svgmin({
        js2svg: { pretty: true }
      }))
      .pipe( gulp.dest( paths.dest ))
  };
};
