var Pane = (function() {

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
	var setData = function(event) {

		// get the data-href attribute from the link
		var href = $(event.target).data('href');

		// If we are already on the page requested, just die silently
		if ( _settings.path + href === content.currentURL ) {
			return
		}

		// the path requested
		content.href = href

		// get the current relative path
		// @example - example.com/path/to/page.html
		// @returns - /path/to/page.html
		content.currentURL = window.location.pathname;

	}

	var hideCurrentContent = function() {

		var hider = _settings.hider;

		// Hide current content by animating an overlay
		// @see https://greensock.com/tweenmax
		// @param {Object || Array} element(s) - The element(s) to add tween to
		// @param {Number} seconds - Over many seconds the tween lasts
		// @param {Object} css - The properites of the element to tween
		// @param {Object} ease - Easing Properties built into Tweenmax
		TweenMax.to(
			hider,
			_settings.speed, {
				top: 0,
				opacity: 1,
				onComplete: loadContent,
				ease: Back.easeOut.config(1.25)
			});
	}

	var showNewContent = function() {

		var hider = _settings.hider;

		hideLoadingAnim();

		// Hide current content by animating an overlay
		// @see https://greensock.com/tweenmax
		// @param {Object || Array} element(s) - The element(s) to add tween to
		// @param {Number} seconds - Over many seconds the tween lasts
		// @param {Object} css - The properites of the element to tween
		// @param {Object} ease - Easing Properties built into Tweenmax
		TweenMax.to(
			hider,
			_settings.speed, {
				top: '150vh',
				opacity: 0,
				ease: Back.easeOut.config(1.25)
			});
	}

	var updateURL = function() {}

	var showLoadingAnim = function() {
		_settings.loader.show()
	}

	var hideLoadingAnim = function() {
		_settings.loader.hide()
	}

	// Load the data into the parent container
	var loadContent = function() {
		var data = _settings.path + content.href;

		showLoadingAnim();
		
		_settings.container.load(data, showNewContent)
	}

	return {

		// Swaps out the current view for the requested view
		// using JQuery.load and TweenMax for the animations
		// updates the page url
		// @public
		updateView: function() {
			setData(event);
			hideCurrentContent();
			showLoadingAnim();
		}
	}


})();	
module.exports = Pane;