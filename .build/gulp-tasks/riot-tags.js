// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.templates;

// Riot tags //////////////////////////////////////////////////////////////////
// Concatenate Riot tags into a single template file
module.exports = function ( gulp, plugins ) {
  return function () {
    return gulp.src( paths.src )
      .pipe( plugins.concat( 'templates.tag' ))
      .pipe( gulp.dest( paths.dest ));
  };
};
