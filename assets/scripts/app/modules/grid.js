
// Object and methods for our Grid
// @returns public methods:
// Grid.show() - show nav items
// Grid.hide() - hide nav items
// Grid.isAnimating() - check if grid is currently being animated
var Grid = (function() {

	// Some default settings to get us going
	var _settings = {
		speed: .25,
		gridItems: '.grid__item'
	}

	return {

		//Show Grid items using a staggered effect
		// @public
		show: function() {

			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item 
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(
				_settings.gridItems,
				_settings.speed, {
					opacity: 1,
					transform: 'scale(1)',
					ease: Power4.easeIn
				}, .08);

		},

		// Reverse the stagger effect
		// @public
		hide: function() {

			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item 
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(
				_settings.gridItems,
				_settings.speed, {
					opacity: 0,
					transform: 'scale(.7)',
					ease: Power4.easeIn
				}, .08);

		},

		// Helper function to tell if grid is animating
		// @public
		isAnimating: function() {
			return Tweenmax.isTweening(_settings.gridItems);
		},
	}


})();

	// Show Grid once all images and background images have loaded
	// @see https://github.com/desandro/imagesloaded
	// @param {Array, Element, NodeList, String} elem
	// @param {Object or Function} options - if function, use as callback
	// @param {Function} onAlways - callback function
	imagesLoaded( document.querySelectorAll('.grid__item'), function() {
		Grid.show();
	})

module.exports = Grid;