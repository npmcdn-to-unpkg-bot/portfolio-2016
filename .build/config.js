/**
 * This holds all of the config info for all of our gulp tasks.  Feel free to
 * run all this over as needed after deleting the git repo for the starter.
 */

// Top-level config object
var config = {
  includes: {},
  paths: {}
};

// Check for a local config and read that in (this is useful for contributing
// to the repo as it allows you to keep the repo around on a local copy of a
// live project).  Load this here so the base path can be overridden.
try {
  var localConfig = require( './config.local' );

  if ( localConfig.paths && localConfig.paths.base ) {
    config.paths.base = localConfig.paths.base;
  }
} catch ( err ) {
  // If the module wasn't found, that's fine, do nothing
  if ( err ) {
    if ( err.code !== 'MODULE_NOT_FOUND' ) {
      console.error( 'Error opening local config: ', err.code );
    }
  }
}

///////////////////////////////////////////////////////////////////////////////
// Includes ///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// These are used in conjunction with wiredep.  Any scripts which should
// NOT be included in the final vendor.js file should be placed in
// exclude while any exceptions (i.e. scripts that couldn't be found
// via bower) should be placed in include.
config.includes = {
  exclude: [
    /modernizr/,
    /jquery\.js/
  ],
  include: {
    // Will be inserted before bower dependencies
    before: [
      '../assets/scripts/custom/modernizr.custom.min.js'
    ],

    // Will be inserted after bower dependencies
    after: []
  }
};

///////////////////////////////////////////////////////////////////////////////
// Paths //////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Set the base path - all other paths will start relative to this. Don't
// overwrite this if it was already set in the local config
if ( ! config.paths.base ) {
  config.paths.base  = '../assets/';
}

// Path to bower components, useful for referecing a bower package directly if
// needed
config.paths.bower = config.paths.base + 'bower-components/';

// Style paths
config.paths.styles = {
  styles:     config.paths.base + 'styles/',
  stylesMain: config.paths.base + 'styles/application.css',
  sass:       config.paths.base + 'sass/',
  sassMain:   config.paths.base + 'sass/application.sass'
};

// Script paths
config.paths.scripts = {
  appDir:  config.paths.base + 'scripts/app/',
  appMain: config.paths.base + 'scripts/app/app.js',
  dist:    config.paths.base + 'scripts/dist/',
  custom:  config.paths.base + 'scripts/custom/'
};

// Icons (icon font)
config.paths.icons = {
  icons:    config.paths.base + 'fonts/icons/',
  srcDir:   config.paths.base + 'fonts/icons/src/',
  src:      config.paths.base + 'fonts/icons/src/**/*.svg',
  dest:     config.paths.base + 'fonts/icons/min/',
  template: config.paths.base + 'fonts/icons/icons.tmpl',
  dist:     config.paths.base + 'fonts/dist/',
  fonts:    config.paths.base + 'sass/fonts/'
};

// Assets (images, SVGs)
config.paths.assets = {
  images: {
    srcDir:   config.paths.base + 'visual/images/src/',
    src:      config.paths.base + 'visual/images/src/*',
    dest:     config.paths.base + 'visual/images/min/'
  },
  svgs: {
    srcDir:   config.paths.base + 'visual/svgs/src/',
    src:      config.paths.base + 'visual/svgs/src/*.svg',
    dest:     config.paths.base + 'visual/svgs/min/'
  }
};

// Watch - files to watch to trigger Gulp tasks.  Word of warning: watch as few
// files as possible to avoid excessive CPU use (seriously, past a few hundred
// files Watch will start to eat your CPU)
config.paths.watch = {
  scripts:    [ config.paths.base + 'scripts/app/**/*.js' ],
  styles:     [ config.paths.base + 'sass/**/*.*' ],
  icons:      [ config.paths.base + 'fonts/icons/src/**/*.*' ],
  svgs:       [ config.paths.base + 'visual/svgs/src/**/*.*' ],
  images:     [ config.paths.base + 'visual/images/src/**/*.*' ],

  // Put your template paths here to have LR work when modifying templates
  livereload: [
    config.paths.base + 'scripts/dist/app.js',
    config.paths.base + 'styles/application.css'
  ]
};

// On PHP projects, add PHP files Jenkins is watch to use gulp phpcs task (will
// report PSR issues)
config.paths.php = [
  '../psr-test.php'
];

// Merge in any other overrides from the localConfig if necessary
if ( localConfig ) {
  var _ = require( 'lodash' );

  config = _.merge( config, localConfig );
}

// And back we go
module.exports = config;
