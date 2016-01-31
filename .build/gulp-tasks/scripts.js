// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths   = require( '../config' ).paths.scripts;

// Pull in the list of vendors from the config
var vendors = require( '../config' ).vendors;

// Scripts ////////////////////////////////////////////////////////////////////
// Scripts! Run scripts through Babel (ES6 --> ES5), then uglify them.
module.exports = function ( gulp, plugins ) {
  return function () {
    var external = [];

    if ( vendors ) {
      var external = Object.keys( vendors ).map( function ( key ) {
        return key;
      });
    }

    return plugins.browserify( paths.appMain )
      // Straight up ignore jquery because it's just annoying that way in a lot
      // of packages
      .ignore( 'jquery' )

      // And externalize all the other vendors
      .external( external )
      .transform( plugins.babelify )
      .bundle()
      .on( 'error', function ( err ) {
        return plugins.notify().write( err );
      })
      .pipe( plugins.vinylSourceStream( 'app.js' ))
      .pipe( gulp.dest( paths.dist ))
      .pipe( plugins.streamify( plugins.uglify() ))
      .pipe( plugins.rename({ extname: '.min.js' }))
      .pipe( gulp.dest( paths.dist ));
  };
};
