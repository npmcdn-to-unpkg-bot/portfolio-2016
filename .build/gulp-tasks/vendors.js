// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.scripts;

// Pull in utility module for doing Wiredeps things
var utility = require( '../utility' );

// Vendors ////////////////////////////////////////////////////////////////////
// Does magic things with Bower and Wiredeps to automatically build vendor.js
// from Bower dependencies
module.exports = function ( gulp, plugins ) {
  return function () {
    var vendors = utility.getVendors();

    if ( vendors.length ) {
      // Concat and uglify the vendors to produce the final vendor files
      return gulp.src( vendors )
        .pipe( plugins.concat( 'vendor.js' ))
        .pipe( gulp.dest( paths.dist ))
        .pipe( plugins.streamify( plugins.uglify() ))
        .pipe( plugins.rename({ extname: '.min.js' }))
        .pipe( gulp.dest( paths.dist ));
    }
  };
};
