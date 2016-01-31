// Pull in the global config file which has all the paths and other config bits
// this thing uses
var paths  = require( '../config' ).paths.icons;

// Iconfont ///////////////////////////////////////////////////////////////////
// Generate icon fonts.  These are pulled from the min directory, so be sure to
// run the svgmin task before running this (or there won't be anything in the
// folder).
module.exports = function ( gulp, plugins ) {
  return function () {
    gulp.src( paths.src )
      .pipe( plugins.svgmin({
        js2svg: { pretty: true }
      }))
      .pipe( gulp.dest( paths.dest ))
      .pipe( plugins.iconfont({
        fontName: 'icons',
        normalize: true
      }))
      .on( 'glyphs', function ( glyphs, options ) {
        gulp.src( paths.template )
          .pipe( plugins.consolidate( 'lodash', {
            glyphs: glyphs.map( function ( glyph ) {
              return { name: glyph.name, codepoint: glyph.unicode[ 0 ].charCodeAt( 0 ) };
            }),
            fontName: 'icons',
            fontPath: paths.dist
          }))
          .pipe( plugins.rename( '_icons.scss' ))
          .pipe( gulp.dest( paths.fonts ));
      })
      .pipe( gulp.dest( paths.icons ));
  };
};
