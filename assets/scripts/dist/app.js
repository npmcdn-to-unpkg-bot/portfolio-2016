(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
'use strict';

(function ($) {
  window.Portfolio = {};

  window.Portfolio.mainNav = require('./modules/mainNav');
  window.Portfolio.mainNav = require('./modules/grid');

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

},{"./modules/grid":2,"./modules/mainNav":3}],2:[function(require,module,exports){

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

module.exports = Grid;

},{}],3:[function(require,module,exports){
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

// Whoo! All that ^^ so we could do this.
$('.menu-button').on('click', function () {
	MainNav.toggle();
});

module.exports = MainNav;

},{}]},{},[1]);
