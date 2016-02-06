// main controller of the site
(function($) {
	window.Portfolio = {};

	window.Portfolio.grid = require('./modules/grid');


	//global ready function this should be the only time we call ready
	// this will loop through all the elements in the bauApp and call
	// their load funcitons still needs some clean up but its working so yeah.
	// 
	// Thinking of doing somehting like this for resize or scrolling events
	// so we have just one event that dispatches all the calls
	$(document).ready( function() {

		for(var item in window.Portfolio) {
			if(typeof window.Portfolio[item] == "function") {
				window.Portfolio[item].prototype.load($);
			}
		}
	});

})( Zepto );