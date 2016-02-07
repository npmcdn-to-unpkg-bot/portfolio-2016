(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
"use strict";

(function ($) {
  window.Portfolio = {};

  window.Portfolio.mainNav = require('./modules/mainNav');

  //global ready function this should be the only time we call ready
  // this will loop through all the elements in the Portfolio and call
  // their load funcitons still needs some clean up but its working so yeah.
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

var MainNav = {

	settings: {
		speed: .25,
		navItems: 'nav li',
		toggleButton: $('.menu-button')
	},

	show: function show() {

		$('body').removeClass('js-is-page');

		// Nav Item Stagger Effect
		TweenMax.staggerTo(MainNav.settings.navItems, MainNav.settings.speed, {
			textIndent: 60,
			ease: Back.easeOut.config(1.25)
		}, .1);
	},

	hide: function hide() {
		$('body').addClass('js-is-page');
		TweenMax.staggerTo(MainNav.settings.navItems, MainNav.settings.speed / 2, {
			textIndent: -400,
			ease: Back.easeOut.config(1.25)
		}, .075);
	},

	toggleNav: function toggleNav() {},

	bindEvents: function bindEvents() {
		this.settings.toggleButton.on('click', function () {
			if ($('body').hasClass('js-is-page')) {
				MainNav.show();
			} else {
				MainNav.hide();
			}
		});
	},

	init: function init() {
		this.bindEvents();
	}

};

MainNav.init();

module.exports = MainNav;

},{}]},{},[1]);
