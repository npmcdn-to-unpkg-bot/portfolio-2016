var MainNav = {

	settings: {
		speed: .35,
		navItems: 'nav li',
		toggleButton: $('.menu-button'),
	},


	show: function() {

		$('body').removeClass('js-is-page');

		// Nav Item Stagger Effect
		TweenMax.staggerTo(
			MainNav.settings.navItems,
			MainNav.settings.speed, {
				textIndent: 60,
				ease: Back.easeOut.config(1.25)
			}, .15);

	},
	
	hide: function() {
		$('body').addClass('js-is-page');

		// Reverse nav stagger
		TweenMax.staggerTo(
			MainNav.settings.navItems,
			MainNav.settings.speed/1.5, {
				textIndent: -400,
				ease: Back.easeOut.config(1.25)
			}, .075);
	},


	toggleNav: function() {},

	
	bindEvents: function() {
		this.settings.toggleButton.on('click', function() {
			if( $('body').hasClass('js-is-page') ) {
				MainNav.show();
			} else {
				MainNav.hide();
			}
		})
	},


	init: function() {
		this.bindEvents();
	}

}

MainNav.init();

module.exports = MainNav;