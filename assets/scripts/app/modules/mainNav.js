// Object and methods for our main navigation
// @returns public methods:
// MainNav.show() - show nav items
// MainNav.hide() - hide nav items
// MainNav.toggle() - show/hide nav items

var MainNav = (function() {

	// Some configurable defaults
	// @private
	var _settings = {

		// This will be used to set our animation speed
		speed: .35,

		// These are the elements in our navigation
		navItems: 'nav li'
	}

	// A helper function to determine if the user
	// is looking at a page or a menu
	// @private
	// @returns Boolean
	var isVisable = function() {
		return $('body').hasClass('js-is-page');
	}

	// Sets the below methods as public
	// @example MainNav.show()
	return {

		// A helper function to determine if the user
		// is looking at a page or a menu
		// @public
		// @returns Boolean
		isVisable: function() {
			return !$('body').hasClass('js-is-page');
		},

		// Shows the nav items
		// @public
		show: function() {

			$('body').removeClass('js-is-page');

			// Stagger effect using the GSAP library
			// @see https://greensock.com/tweenmax
			// @param {Object || Array} element(s) - The element(s) to add tween to
			// @param {Number} seconds - Over many seconds the tween lasts
			// @param {Object} css - The properites of the element to tween
			// @param {Object} ease - Easing Properties built into Tweenmax
			// @param {Number} delay - How many seconds before the next item 
			// in the animation loop starts it's tween after previous has finished
			TweenMax.staggerTo(
				_settings.navItems,
				_settings.speed, {
					textIndent: 60,
					ease: Back.easeOut.config(1.25)
				}, .15);

		},
		
		// Hides the nav items
		// @public
		hide: function() {

			$('body').addClass('js-is-page');

			// Reverse nav stagger
			TweenMax.staggerTo(
				_settings.navItems,
				_settings.speed/1.5, {
					textIndent: -400,
					ease: Back.easeOut.config(1.25)
				}, .075);
		},

		// Hide or Show the Nav items
		// @public
		toggle: function() {
			this.isVisable() ? this.hide() : this.show() 
		},

	}

})();


// Whoo! All that ^^ so we could do this.
$('.menu-button').on('click', function () {
	MainNav.toggle()
})

module.exports = MainNav;
