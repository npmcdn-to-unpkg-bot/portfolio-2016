var BindEvents = (function() {

	return {
		init: function() {
			$('.menu-button').on('click', function () {
				Portfolio.mainNav.toggle()
			})

			$('.js-page-link').on('click', function() {
				if ( Portfolio.mainNav.isVisable() && !Portfolio.mainNav.isAnimating ) {
					return
				}
				$('.active').removeClass('active');
				$(this).addClass('active');
				Portfolio.mainNav.hide();
				Portfolio.pane.updateView(event);
			})

			// window.addEventListener("popstate", function(event) {
		 //       var page = location.pathname
		 //       Portfolio.load(page, false)
			// });



		}
	}

})();

BindEvents.init()

module.exports = BindEvents;