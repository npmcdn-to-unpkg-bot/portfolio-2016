# FRAMEWORK.IO.JS.LY

A simple, extensible, extendable, affordable, DISRUPTIVE and above all, simple framework for efficiently frameworking your frameworks with the goal of constructing an effective framework of frameworks which is frameworkable with all of your frameworked framework frameworks.

## Dependencies

- Angular.js
- Ember.js
- Backbone.js
- Knockout.js
- Aurelia.js
- Dojo.js
- Polymer.js
- React.js
- JayEss.j--okay look, here's a better idea

Just download NPM.  Like all of it.  Probably a more sound approach.  I dunno if this:

```
npm install *
```

is a thing or not, but try it out and give it a few days and come back.

## Other Dependencies

- [Node.js](https://nodejs.org/)
- [Bower](http://bower.io/#install-bower)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Setup

First, clone the package repo into your project (most likely in the .build directory, but anywhere is fine so long as the paths are updated appropriately).  After cloning the repo down, __delete the .git folder__ (unless you plan on making changes to the package itself, in which case see the Development section below).  The package is not intended to be included as a submodule of the project.

From the root directory of the package, (probably .build), install all the required packages:

```
npm install
```

Then build the required base directory structure with the following:

```
gulp init
```

This will attempt to create the base directory specified in the config and fill it out with the structure expected by the config.  If the directory is already present (../assets by default), init will do nothing.

Finally, add desired front end packages to bower.json and install with:

```
bower install
```

## Use

Most of the time, what you'll want to do is watch development assets (scripts, styles, images, etc.) and have Gulp automatically Do Stuff.  For that, just run:

```
gulp
```

From the package directory (.build).

Occasionally it's useful to run one of Gulp's tasks directly.  Not all tasks are directly tied to a watch task due to performance concerns (or running the task on every file change might be overkill).  The current full list of tasks is follows:

```
gulp modernizr
gulp vendors/vendor
gulp scripts/js
gulp jshint
gulp styles/css
gulp iconfont
gulp svgmin
gulp imagemin
gulp phpcs
gulp init
```

Full descriptions of what each command does can be found in the gulpfile itself.

## Included Tasks

#### Init

This task should be run only once when the package is first cloned down.  It will create the required directory structure in the base directory specified in the config.  If you already have the base directory (../assets/ by default) and it is not empty, this task will do nothing.

#### Modernizr

Creates a custom build of Modernizr based on what tests you're actually using (instead of the whole thing).  Will scan your CSS/JS files to generate this.  The result modernizr.custom.min.js file can be included directly (should be included in the head) or will automatically be rolled into the top of the vendor.js file if you don't specify otherwise.

#### Vendors

Will create vendor.js file by concatting and uglifying all dependencies defined in bower.json along with whatever custom includes/excludes are specified in the config.

#### Scripts

Will create application.js file by concatting and uglifying all scripts found in the scripts/app directory.  By default, this just smashes together everything in the directory, but feel free to impose some order on how files are duct taped together in the config file.

#### JSHint

Code linting.  Runs on the app files by default.  __Does not run automatically__, so don't forget to run it on occasion.

#### Styles

Compiles Sass files in the sass directory, runs them through autoprefixer (adds vendor-specific prefixes as needed), creates separate minified and unminified CSS output and adds sourcemaps (to the unminified flavor).

#### Iconfont

Generates an icon Sass include from SVG icons in /fonts/icons/src.  Will output an \_icons.scss file which is included into the Sass and includes helper functions and CSS definitions for using the icon font.

#### SVGMin

Minifies and clean up SVG images (removes crap).

#### ImageMin

Minifies images.

#### PHPCS

Runs PHP Code Sniffer on PHP code specified in config to verify PSR compliance. __Does not run automatically__.

## Advanced Use

All of the paths the package reference can be found in config.js.  This includes the base path (where your assets are located) plus all the subpaths for scripts, fonts, images, etc.  Feel free to change these paths if needed.  The config also has an includes section for manually including/excluding scripts (can be an issue if you can't find a bower repo for something or need to nix a dependency or whatever).  Feel free to modify these as necessary depending on your situation.

## Development

If you find a bug or just want to contribute to this thing - good for you, man!  Good FOR you.  If that's the case, don't delete the .git folder once you clone this thing down on whatever project you're using it on.

Both the bower file and the config can be overwritten by simply creating a
bower.local.json or config.local.js file respectively with the same syntax
as the original file.  So, to make changes to the package while also changing what you need to for the project to work, put any necessary config/bower changes for the project in the local flavor of the file (for bower, don't forget to still install the bower packages - Gulp still needs the physical files to be present to create the vendor file).

The gulp-tasks folder includes a simple \_template.js file that can be copied
over when creating a new task to keep the correct format.  Once the task is added, it's auto-loaded into the gulpfile.  You just have to specify the task itself (this could also be autol-loaded, but it's currently not on purposes just so it's explicit what all the tasks are).
