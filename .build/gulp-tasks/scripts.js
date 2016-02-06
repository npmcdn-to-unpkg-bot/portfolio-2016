// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.scripts;

// Scripts ////////////////////////////////////////////////////////////////////
// Scripts! Run scripts through Babel (ES6 --> ES5), then uglify them.
module.exports = function ( gulp, plugins ) {
  return function () {
    return plugins.browserify( paths.appMain )
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
