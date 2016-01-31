// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.watch;

// Livereload /////////////////////////////////////////////////////////////////
// This automatically refreshes the browser when triggered.  This is great
// when you're hammering out a lot of CSS/JS because it will refresh when Gulp
// finishes building these.  Requires a Chrome extension to work properly:
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
module.exports = function ( gulp, plugins ) {
  return function () {
    // Start the livereload listener
    plugins.livereload.listen();

    // Configure livereload
    // The blank string is not just for show
    var handler = gulp.watch( paths.livereload, [ '' ] );

    // Livereload doesn't use a regular watch handler because we need the path to
    // the file that changed (livereload uses this to do clever things like reload
    // only the page styles or JS engine without having to refresh the entire
    // page).
    handler.on( 'change', function ( event ) {
      plugins.livereload.changed( event.path );
    });
  };
};
