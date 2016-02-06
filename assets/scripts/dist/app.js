(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// main controller of the site
"use strict";

(function ($) {
  window.Portfolio = {};

  // window.Portfolio.mainNav = require('./modules/mainNav');

  //global ready function this should be the only time we call ready
  // this will loop through all the elements in the Portfolio and call
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

},{}]},{},[1]);
