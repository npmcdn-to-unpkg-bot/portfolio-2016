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

	window.addEventListener("popstate", function(event) {
       content.href = location.pathname
       loadContent();
	});

	// This updates our content obj
	// @param {object} event - The event passed from the click handler
	// @private
	var setData = function(event) {

		// get the data-href attribute from the link 
		// or the href attribute if data-href isn't present
		var href = $(event.target).data('href') || $(event.target).attr('href');

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

	var updateURL = function() {
		// History API Supported 
		// if (Modernizr.history) { // Can't get 'gulp modernizr to read the test commenting out for now'
			var url = content.href
			history.pushState(null , null, url)
		// }


	}

	var showLoadingAnim = function() {
		_settings.loader.show()
	}

	var hideLoadingAnim = function() {
		_settings.loader.hide()
	}

	// Load the data into the parent container
	var loadContent = function() {
		var data = _settings.path + content.href;

		// If the requested url is root
		// Send the user to the hello page
		if (data === _settings.path + '/') {
			data = _settings.path + 'hello.html';
		}

		hideCurrentContent();
		
		_settings.container.load(data, showNewContent)
	}

	return {

		// Pane.updateView()
		// Swaps out the current view for the requested view
		// using JQuery.load and TweenMax for the animations
		// updates the page url
		// @public
		updateView: function() {
			setData(event);
			hideCurrentContent();
			updateURL();
			showLoadingAnim();
		}
	}

})();	
module.exports = Pane;