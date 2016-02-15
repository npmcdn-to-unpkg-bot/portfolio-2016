// main controller of the site
(function($) {
  window.Portfolio = {};

  window.Portfolio.mainNav = require('./modules/mainNav');
  window.Portfolio.grid = require('./modules/grid');
  window.Portfolio.pane = require('./modules/pane');

  window.Portfolio.bindEvents = require('./modules/bindEvents');


  //global ready function this should be the only time we call ready
  // this will loop through all the elements in the Portfolio and call
  // their load functions still needs some clean up but its working so yeah.
  // 
  // Thinking of doing something like this for resize or scrolling events
  // so we have just one event that dispatches all the calls
  $(document).ready( function() {

    for(var item in window.Portfolio) {
      if(typeof window.Portfolio[item] == "function") {
        window.Portfolio[item].prototype.load($);
      }
    }
  });

})( Zepto );