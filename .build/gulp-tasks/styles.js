// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.styles;
var notify = require( 'gulp-notify' );
// Styles /////////////////////////////////////////////////////////////////////
// Compile SASS styles and minimize.
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.sassMain )
      .pipe( plugins.sourcemaps.init() )
      .pipe( plugins.sass().on( 'error', function( err ) {
        return notify().write(err);
      }))
      .pipe( plugins.autoprefixer({
        browsers: [ 'last 3 versions' ],
        remove: false
      }))
      .pipe( plugins.sourcemaps.write() )
      .pipe( gulp.dest( paths.styles ))
      .pipe( plugins.minifyCss() )
      .pipe( plugins.rename({ extname: '.min.css' }))
      .pipe( gulp.dest( paths.styles ));
  };
};
