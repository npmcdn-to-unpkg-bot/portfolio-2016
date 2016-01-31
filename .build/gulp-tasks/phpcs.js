// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.php;

// PHPCS //////////////////////////////////////////////////////////////////////
// PHP codesniffing.  Will report PSR issues in defined PHP files. Obviously
// only applies to PHP projects, so use where applicable.
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths )
      .pipe( plugins.phpcs({
        standard: 'PSR2',
        ignore: '*.tpl.php'
      }))
      .pipe( plugins.phpcs.reporter( 'log' ));
  };
};
