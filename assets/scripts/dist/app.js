(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
'use strict';

(function ($) {
  window.Portfolio = {};

  window.Portfolio.mainNav = require('./modules/mainNav');
  window.Portfolio.grid = require('./modules/grid');
  window.Portfolio.pane = require('./modules/pane');
  window.Portfolio.bindEvents = require('./modules/bindEvents');
  window.Portfolio.backgroundImage = require('./modules/background-image');

  //global ready function this should be the only time we call ready
  // this will loop through all the elements in the Portfolio and call
  // their load functions still needs some clean up but its working so yeah.
  //
  // Thinking of doing something like this for resize or scrolling events
  // so we have just one event that dispatches all the calls
  $(document).ready(function () {

    for (var item in window.Portfolio) {
      if (typeof window.Portfolio[item] == "function") {
        window.Portfolio[item].prototype.load($);
      }
    }
  });
})(Zepto);

},{"./modules/background-image":2,"./modules/bindEvents":3,"./modules/grid":4,"./modules/mainNav":5,"./modules/pane":6}],2:[function(require,module,exports){

// Constructor for adding background images to
// content blocks
'use strict';

var BackgroundImage = function BackgroundImage(element, $) {
  var that = this;
  this.$element = $(element);
  this.$image = this.$element.find('img');

  _.each(this.$image.toArray(), function (img) {

    if (img) {
      // Check if image has already loaded and replace background immediately
      if (that.imageComplete(img)) {
        that.replaceBackground();
      } else {
        var img = $(img);
        // Otherwise wait for image load
        img.on('load', (function () {
          that.replaceBackground();
        }).bind(that));
      }
    }
  });
};

// Adds/Replaces background image on the content block
// from the hidden image picturefill loads.
BackgroundImage.prototype.replaceBackground = function () {
  var that = this;
  var sources = [];

  _.each(this.$image.toArray(), function (img) {
    sources.push('url(' + (img.currentSrc || img.src) + ')');
    img.remove();
  });

  that.$element.css({
    'background-image': sources
  });
};

BackgroundImage.prototype.imageComplete = function (image) {
  if (image.complete) {
    return true;
  }

  // Or we can check the natural dimensions
  if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth > 0) {
    return true;
  }

  // Guess not =[
  return false;
};

BackgroundImage.prototype.load = function ($) {
  $('.js-background-image').each(function () {
    var backgroundImage = new BackgroundImage(this, $);
  });
};

module.exports = BackgroundImage;

},{}],3:[function(require,module,exports){
'use strict';

var BindEvents = (function () {

	return {
		init: function init() {
			$('.menu-button').on('click', function () {
				Portfolio.mainNav.toggle();
			});

			$('.js-page-link').on('click', function () {
				if (Portfolio.mainNav.isVisable() && !Portfolio.mainNav.isAnimating) {
					return;
				}
				$('li.active').removeClass('active');
				$(this).addClass('active');
				Portfolio.mainNav.hide();
				Portfolio.pane.updateView(event);
			});
		}
	};
})();

BindEvents.init();

module.exports = BindEvents;

},{}],4:[function(require,module,exports){

// Object and methods for our Grid
// @returns public methods:
// Grid.show() - show nav items
// Grid.hide() - hide nav items
// Grid.isAnimating() - check if grid is currently being animated
'use strict';

var Grid = (function () {

	// Some default settings to get us going
	var _settings = {
		speed: .25,
		gridItems: '.grid__item'
	};

	return {

		// @TODO
		// This could probably be refactored
		// Just doesn't seem that good

		// Grid.load
		// @public
		// @description:
		// 		Get the data the relates to the given page string
		//		Add the data to the underscore template
		// 		Check to make sure everything is okay
		// 		Show the new grid
		// @param {String} page - The page data you want to load
		load: function load(page) {

			var getData = (function () {
				$.ajax({
					type: 'GET',
					url: '/assets/scripts/app/data/gridData.json',
					success: function success(data) {
						setData(data, checkData);
					}
				});
			})();

			// If we have have data
			// set the data in against our underscore template
			// then append the data to our grid container
			// @param {JSON} data - The data that we want to show
			// @param {Function} - Callback
			var setData = function setData(data, callback) {
				if (data && data.pages[page].gridItems) {
					var compiledHTML = _.template($('#grid-template').html());
				}

				$('.grid .container').append(compiledHTML(data.pages[page]));

				callback();
			};

			var checkData = function checkData() {

				// If our data contained an image
				// replace the <img> with a background instance
				// and then remove the <img>
				$('.js-background-image').each(function () {
					var backgroundImage = new Portfolio.backgroundImage(this, $);
				});

				var gridItems = document.querySelectorAll('.grid__item');
				var observer = new FontFaceObserver('Aller');

				// check to see that our font-family has been loaded
				// @see https://github.com/bramstein/fontfaceobserver
				// Once loaded, check to see if our images have been loaded
				// Once image have been loaded we show our grid items
				observer.check().then(function () {
					// Show Grid once all images and background images have loaded
					// @see https://github.com/desandro/imagesloaded
					// @param {Array, Element, NodeList, String} elem
					// @param {Object or Function} options - if function, use as callback
					// @param {Function} onAlways - callback function
					imagesLoaded(gridItems, function () {
						Grid.show();
					});
				});
			};
		},

		//Show Grid items using a staggered effect
		// @public
		show: function show() {
			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(_settings.gridItems, _settings.speed, {
				opacity: 1,
				transform: 'scale(1)',
				ease: Power4.easeIn
			}, .08);
		},

		// Reverse the stagger effect
		// @public
		hide: function hide() {

			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(_settings.gridItems, _settings.speed, {
				opacity: 0,
				transform: 'scale(.7)',
				ease: Power4.easeIn
			}, .08);
		},

		// Helper function to tell if grid is animating
		// @public
		isAnimating: function isAnimating() {
			return Tweenmax.isTweening(_settings.gridItems);
		}
	};
})();
Grid.load('hello');

module.exports = Grid;

},{}],5:[function(require,module,exports){
// Object and methods for our main navigation
// @returns public methods:
// MainNav.show() - show nav items
// MainNav.hide() - hide nav items
// MainNav.toggle() - show/hide nav items
// MainNav.isAnimating() - Check if our main nav is currently animating
'use strict';

var MainNav = (function () {

	// Some configurable defaults
	// @private
	var _settings = {

		// This will be used to set our animation speed
		speed: .35,

		// These are the elements in our navigation
		navItems: 'nav li'
	};

	// A helper function to determine if the user
	// is looking at a page or a menu
	// @private
	// @returns Boolean
	var isVisable = function isVisable() {
		return $('body').hasClass('js-is-page');
	};

	// Sets the below methods as public
	// @example MainNav.show()
	return {

		// A helper function to determine if the user
		// is looking at a page or a menu
		// @public
		// @returns Boolean
		isVisable: function isVisable() {
			return !$('body').hasClass('js-is-page');
		},

		// Shows the nav items
		// @public
		show: function show() {

			$('body').removeClass('js-is-page');

			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(_settings.navItems, _settings.speed, {
				textIndent: 60,
				ease: Back.easeOut.config(1.25)
			}, .15);
		},

		// Helper function to tell if the main nav is animating
		// @public
		isAnimating: function isAnimating() {
			return Tweenmax.isTweening(_settings.navItems);
		},

		// Hides the nav items
		// @public
		hide: function hide() {

			$('body').addClass('js-is-page');

			// Reverse nav stagger
			TweenMax.staggerTo(_settings.navItems, _settings.speed / 1.5, {
				textIndent: -400,
				ease: Back.easeOut.config(1.25)
			}, .075);
		},

		// Hide or Show the Nav items based on visibility
		// @public
		toggle: function toggle() {
			this.isVisable() ? this.hide() : this.show();
		}

	};
})();
module.exports = MainNav;

},{}],6:[function(require,module,exports){
'use strict';

var Pane = (function () {

	// Some default _settings to get us started
	// @private
	var _settings = {

		// the dom element that holds our views
		container: $('.content'),

		// the path to our content
		path: '/content/',

		// loading animation dom object
		loader: $('.js-loader'),

		// This is what are are going to
		// animate inorder to hide our loading the page
		hider: $('.overlay'),

		// speed defult for hiding and showing the overlay
		speed: .7
	};

	// this will be updated based on the event
	// @private
	var content = {};

	// This updates our content obj
	// @param {object} event - The event passed from the click handler
	// @private
	var setData = function setData(event) {

		// get the data-href attribute from the link
		var href = $(event.target).data('href');

		// If we are already on the page requested, just die silently
		if (_settings.path + href === content.currentURL) {
			return;
		}

		// the path requested
		content.href = href;

		// get the current relative path
		// @example - example.com/path/to/page.html
		// @returns - /path/to/page.html
		content.currentURL = window.location.pathname;
	};

	var hideCurrentContent = function hideCurrentContent() {

		var hider = _settings.hider;

		// Hide current content by animating an overlay
		// @see https://greensock.com/tweenmax
		// @param {Object || Array} element(s) - The element(s) to add tween to
		// @param {Number} seconds - Over many seconds the tween lasts
		// @param {Object} css - The properites of the element to tween
		// @param {Object} ease - Easing Properties built into Tweenmax
		TweenMax.to(hider, _settings.speed, {
			top: 0,
			opacity: 1,
			onComplete: loadContent,
			ease: Back.easeOut.config(1.25)
		});
	};

	var showNewContent = function showNewContent() {

		var hider = _settings.hider;

		hideLoadingAnim();

		// Hide current content by animating an overlay
		// @see https://greensock.com/tweenmax
		// @param {Object || Array} element(s) - The element(s) to add tween to
		// @param {Number} seconds - Over many seconds the tween lasts
		// @param {Object} css - The properites of the element to tween
		// @param {Object} ease - Easing Properties built into Tweenmax
		TweenMax.to(hider, _settings.speed, {
			top: '150vh',
			opacity: 0,
			ease: Back.easeOut.config(1.25)
		});
	};

	var updateURL = function updateURL() {};

	var showLoadingAnim = function showLoadingAnim() {
		_settings.loader.show();
	};

	var hideLoadingAnim = function hideLoadingAnim() {
		_settings.loader.hide();
	};

	// Load the data into the parent container
	var loadContent = function loadContent() {
		var data = _settings.path + content.href;

		showLoadingAnim();

		_settings.container.load(data, showNewContent);
	};

	return {

		// Swaps out the current view for the requested view
		// using JQuery.load and TweenMax for the animations
		// updates the page url
		// @public
		updateView: function updateView() {
			setData(event);
			hideCurrentContent();
			showLoadingAnim();
		}
	};
})();
module.exports = Pane;

},{}]},{},[1]);
