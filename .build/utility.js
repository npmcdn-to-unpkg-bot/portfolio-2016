/**
 * This contains a couple helper functions used to automatically populate all
 * gulp tasks.
 */

// Pull the parent gulp object in for use throughout this thing
var gulp   = require( 'gulp' );

// Global config object for everything in the front end package
var config = require( './config' );

// Pull in fs-extra for doing filesystem tasks
var fs     = require( 'fs-extra' );

/**
 * Load in all gulp dependencies.
 *
 * @return {Object} Returns object containing loaded dependencies
 */
function loadPackages () {
  var contents = require( 'fs' ).readFileSync( './package.json', 'utf-8' );

  if ( ! contents ) { console.error( 'Unable to load package.json file' ); }

  // Pull dependencies out of our package file
  try {
    var dependencies = JSON.parse( contents ).devDependencies;

    // Load dependencies into plugin object
    var packages = {};

    Object.keys( dependencies ).forEach( function ( key ) {
      var packageName = key.replace( 'gulp-', '' ).replace( 'gulp.', '' );
      if ( packageName.indexOf( '-' ) > -1 ) {
        packageName = packageName
          .split( '-' )
          .map( function ( chunk, index ) {
            return index > 0
              ? chunk.substr( 0, 1 ).toUpperCase() + chunk.substr( 1, chunk.length )
              : chunk; } )
          .join( '' );
      }

      // Load the package
      packages[ packageName ] = require( key );
    });

    // And back we go
    return packages;

  } catch ( err ) { console.error( 'Invalid package.json file: ', err ); }
};
module.exports.loadPackages = loadPackages;

/**
 * Load tasks in from gulp-tasks.  This could actually just autoload all tasks
 * the same as autoloading packages, but instead just returns the task
 * functions so each task can still be itemized for readability.  May change in
 * the future if that seems stupid at a later date.
 *
 * @param {Object} gulp    Main Gulp object
 *
 * @return {Object} Returns populated tasks object
 */
function loadTasks () {
  // Load all of our packages
  var packages = loadPackages();

  // Pull all of the task filenames from our internal tasks folder
  var filenames = require( 'fs' ).readdirSync( './gulp-tasks' );

  if ( ! filenames || ! filenames.length ) {
    console.error( 'Unable to load tasks' );
  }

  var tasks = {};

  filenames.forEach( function ( taskName ) {
    tasks[ taskName.replace( '.js', '' ) ] = require( './gulp-tasks/' + taskName )( gulp, packages );
  });

  return tasks;
};
module.exports.loadTasks = loadTasks;

/**
 * Retrieve list of vendor includes.  This uses wiredeps to pull all package
 * dependencies defined in Bower together.  References the includes object in
 * the config - this can be used to include or exclude specific scripts along
 * with the automatic output.
 *
 * @return {Array} Returns array of final dependencies
 */
function getVendors () {
  var includes = config.includes;
  var final    = [];

  // Attempt to load bower config from local side first - this allows a local
  // package config to be used while keeping the repo around (useful for doing
  // development on this thing)
  var bowerJson = fs.readJsonSync( './bower.local.json', { throws: false });

  // If that failed, load the stock one
  if ( ! bowerJson ) {
    var bowerJson = fs.readJsonSync( './bower.json', { throws: false });
  }

  if ( ! bowerJson ) {
    console.error( 'Unable to load Bower config.' );

    return final;
  }

  // Pull in all The Stuff using wiredep + any extra in the scripts include and - any excludes
  var wiredepOutput = require( 'wiredep' )({
    exclude: includes.exclude,
    bowerJson: bowerJson
  });

  if ( wiredepOutput && ( wiredepOutput.js || wiredepOutput.css )) {
    // Now that we have our lists, check for extra includes as well
    if ( includes.include && ( includes.include.before || includes.include.after )) {
      if ( includes.include.before && includes.include.before.length ) {
        final = includes.include.before;
      }

      final = final.concat( wiredepOutput.js );

      if ( includes.include.after && includes.include.after.length ) {
        final = final.concat( includes.include.after );
      }
    } else {
      // Just sent the default bower deps straight on through
      final = wiredepOutput.js;
    }

    console.info( 'Final script build order: \n\n', final );

    // And return the final results
    return final;
  }
}
module.exports.getVendors = getVendors;
