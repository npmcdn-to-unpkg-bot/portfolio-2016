(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
"use strict";

(function ($) {
	window.Portfolio = {};

	window.Portfolio.grid = require('./modules/grid');

	//global ready function this should be the only time we call ready
	// this will loop through all the elements in the bauApp and call
	// their load funcitons still needs some clean up but its working so yeah.
	//
	// Thinking of doing somehting like this for resize or scrolling events
	// so we have just one event that dispatches all the calls
	$(document).ready(function () {

		for (var item in window.Portfolio) {
			if (typeof window.Portfolio[item] == "function") {
				window.Portfolio[item].prototype.load($);
			}
		}
	});
})(Zepto);

},{"./modules/grid":2}],2:[function(require,module,exports){
// Main object that will be returned to the app
'use strict';

var Grid = {

	// Scales Items on Event
	// @param {items} the element(s) to be scaled
	// elements can be an array or dom element or Jquery object
	// @vendor {GSAP} http://greensock.com/docs/
	scaleItems: function scaleItems(items) {

		if (items instanceof $ || items instanceof $.fn.constructor) {
			// if Jquery or Zepto
			items = items.toArray();
		}

		items.forEach(function (el, index) {
			var scale;
			el.addEventListener('mouseover', function (e) {
				scale = TweenMax.to(this, .25, { // element, speed, properties
					borderTopWidth: 0,
					borderLeftWidth: 0,
					borderBottomWidth: 0,
					borderRightWidth: 0,
					boxShadow: '0 15px 24px rgba(0, 0, 0, 0.32), 0 19px 76px rgba(0, 0, 0, 0.4)',
					scale: 1.2,
					zIndex: 1,
					ease: Expo.easeOut
				});
			});

			el.addEventListener('mouseout', function (e) {
				scale.reverse();
			});
		});
	},

	bindEvents: function bindEvents() {
		Grid.scaleItems($('.grid__item'), 'hover');
	},

	init: function init() {
		Grid.bindEvents();
	}

};

Grid.init();

module.exports = Grid;

},{}]},{},[1]);
