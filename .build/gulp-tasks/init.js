// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths;

// Init ///////////////////////////////////////////////////////////////////////
// Build the initial folder structure we need.  Will create base directory and
// all necessary subfolders and whatnot.  Will not run if base directory
// already exists.
module.exports = function ( gulp, plugins ) {
  return function () {
    var fs = require( 'fs-extra' );

    fs.readdir( paths.base, function ( err, files ) {
      // Deal with errors (except directory not found, which is fine)
      if ( err && err.code !== 'ENOENT' ) {
        return console.error( err );
      }

      // Check if directory already exists and do nothing if so
      if ( files && files.length ) {
        return console.error( paths.base + ' directory already exists.  I don\'t want to run your stuff over, so please move it first.' );
      }

      // Make the base directory
      fs.mkdirsSync( paths.base );

      // Copy over Sass templates
      fs.copySync( './templates/sass', paths.styles.sass );

      // Copy over icons template
      fs.copySync( './templates/icons.tmpl', paths.icons.template );

      // Then make all other applicable directories (even if empty)
      fs.mkdirpSync( paths.bower );

      // Styles
      paths.styles.styles

      // Scripts
      fs.mkdirpSync( paths.scripts.appDir );
      fs.mkdirpSync( paths.scripts.dist );
      fs.mkdirpSync( paths.scripts.custom );

      // Icons
      fs.mkdirpSync( paths.icons.srcDir );
      fs.mkdirpSync( paths.icons.dest );
      fs.mkdirpSync( paths.icons.dist );

      // Assets
      fs.mkdirpSync( paths.assets.images.srcDir );
      fs.mkdirpSync( paths.assets.images.dest );
      fs.mkdirpSync( paths.assets.svgs.srcDir );
      fs.mkdirpSync( paths.assets.svgs.dest );

      console.info( 'Finished building the base directory.' );
    });
  };
};
