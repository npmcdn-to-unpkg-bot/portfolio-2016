// Main object that will be returned to the app
var Grid = {

	// Scales Items on Event
	// @param {items} the element(s) to be scaled
	// elements can be an array or dom element or Jquery object
	// @vendor {GSAP} http://greensock.com/docs/
	scaleItems: function(items) {

		if ( items instanceof $ || items instanceof $.fn.constructor ) { // if Jquery or Zepto
			items = items.toArray()
		}

		items.forEach(function(el, index){
			var scale;
			el.addEventListener('mouseover', function(e) {
				scale = TweenMax.to( this, .25, { // element, speed, properties
						borderTopWidth: 0,
						borderLeftWidth: 0,
						borderBottomWidth: 0,
						borderRightWidth: 0,
						boxShadow: '0 15px 24px rgba(0, 0, 0, 0.32), 0 19px 76px rgba(0, 0, 0, 0.4)',
						scale: 1.2,
						zIndex: 1,
						ease: Expo.easeOut
				})
			}) 
				
			el.addEventListener('mouseout', function(e) {
				scale.reverse();
			});
		})
	},


	bindEvents: function() {
		Grid.scaleItems( $('.grid__item'), 'hover')
	},

	init: function() {
		Grid.bindEvents()
	}

}

Grid.init()

module.exports = Grid;