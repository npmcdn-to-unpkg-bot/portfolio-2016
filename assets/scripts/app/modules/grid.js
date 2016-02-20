
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
		load: function(page) {

			var getData = (function() {
				$.ajax({
					type: 'GET',
					url: '/assets/scripts/app/data/gridData.json',
					success: function(data) {
						setData(data, checkData)
					}
				})
			})();


			// If we have have data 
			// set the data in against our underscore template
			// then append the data to our grid container
			// @param {JSON} data - The data that we want to show
			// @param {Function} - Callback 
			var setData = function(data, callback) {
				if (data && data.pages[page].gridItems) {
					var compiledHTML = _.template( $('#grid-template').html() )
				}

				$('.grid .container').append(compiledHTML(data.pages[page]))

				callback();

			}

			var checkData = function() {

				// If our data contained an image
				// replace the <img> with a background instance 
				// and then remove the <img>
				$('.js-background-image').each(function() {
					var backgroundImage = new Portfolio.backgroundImage(this, $);
				});

				var gridItems = document.querySelectorAll('.grid__item');
				var observer = new FontFaceObserver('Aller');

				// check to see that our font-family has been loaded
				// @see https://github.com/bramstein/fontfaceobserver
				// Once loaded, check to see if our images have been loaded
				// Once image have been loaded we show our grid items
				observer.check().then(function(){
					// Show Grid once all images and background images have loaded
					// @see https://github.com/desandro/imagesloaded
					// @param {Array, Element, NodeList, String} elem
					// @param {Object or Function} options - if function, use as callback
					// @param {Function} onAlways - callback function
					imagesLoaded( gridItems, function() {
						Grid.show();
					});
				});
			}


		},

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
Grid.load('hello')

		

module.exports = Grid;