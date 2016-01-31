// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths   = require( '../config' ).paths.scripts;

// Pull in the list of vendors from the config
var vendors = require( '../config' ).vendors;

// Vendors ////////////////////////////////////////////////////////////////////
// Does magic things with Bower and Wiredeps to automatically build vendor.js
// from Bower dependencies
module.exports = function ( gulp, plugins ) {
  return function () {
    if ( vendors ) {
      var vendorArray = Object.keys( vendors ).map( function ( key ) {
        return vendors[ key ];
      });

      // Concat and uglify the vendors to produce the final vendor files
      return gulp.src( vendorArray )
        .pipe( plugins.concat( 'vendor.js' ))
        .pipe( gulp.dest( paths.dist ))
        .pipe( plugins.streamify( plugins.uglify() ))
        .pipe( plugins.rename({ extname: '.min.js' }))
        .pipe( gulp.dest( paths.dist ));
    }
  };
};
