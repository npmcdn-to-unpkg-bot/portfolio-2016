(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
"use strict";

(function ($) {
  window.Portfolio = {};

  window.Portfolio.mainNav = require('./modules/mainNav');

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

},{"./modules/mainNav":2}],2:[function(require,module,exports){
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
	var _isPage = function _isPage() {
		return $('body').hasClass('js-is-page') ? true : false;
	};

	// Sets the below methods as public
	// @example MainNav.show()
	return {

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
			// in the animation loop starts it's tween
			TweenMax.staggerTo(_settings.navItems, _settings.speed, {
				textIndent: 60,
				ease: Back.easeOut.config(1.25)
			}, .15);
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

		// Hide or Show the Nav items
		// @public
		toggle: function toggle() {
			_isPage() ? this.show() : this.hide();
		}

	};
})();

$('.menu-button').on('click', function () {
	MainNav.toggle();
});

module.exports = MainNav;

},{}]},{},[1]);
