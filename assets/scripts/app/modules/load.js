// Portfolio.load(page)
// Loads a requested page 
// Decides whether the page requested
// needs just a preview pane update
// a grid update or both
// @public
// @param {String} page - the page being requested
// @param {Boolean} addHistory - Do we need a new history state?
var Load = (function(page, addHistory) {

	// some default settings to use
	// throughout this function
	var _settings = {

		path: {
			grid: null,
			page: null
		},
		container: {
			grid: null,
			page: null
		}

	}


	// checks to see if the load request
	// if a page or a grid using $.ajax to 
	// check if the file exists
	// @private
	// @returns {Boolean}
	var _isPageRequest = function() {

		$.ajax({
			type: 'GET',
			url: _settings.path.page + page,
			success: function() {
				return true
			},
			error: function() {
				return false
			}
		})
	}


	// hides the current content 
	// while we do our magic
	// @private
	var _hideCurrent = function() {
		if ( _isPageRequest() ) {
			Portfolio.page.hide();
		} else {
			Portfolio.page.hide();
			Portfolio.grid.hide();
		}
	}

	// Does the opposite of _hideCurrent
	var _showNew = function() {
		if ( _isPageRequest() ) {
			Portfolio.page.show();
		} else {
			Portfolio.page.show();
			Portfolio.grid.show();
		}
	}

	// Uses history API to update our url
	// @private
	var _updateURL = function() {
		if (addHistory) {
			history.pushState(null, null, page); 
		}
	}


	// Get the data to load into our page
	// If its successful set the page into the container
	// and update the url of our portfolio
	// @private
	var _getPage = function() {
		var path
		_isPageRequest() ? path = _settings.path.page : path =  _settings.path.grid;

		$.ajax({
			type: 'GET',
			url: path + page,
			success: function(data) {
				_setPage(data, _showNew)
				_updateURL();
			}
		})
	}

	// Insert the HTML data into our container
	// @private
	var _setPage = function(data, callback) {
		var container;
		_isPageRequest() ? container = _settings.container.page : container =  _settings.container.grid;
		$(container).html(data)
	}

	_hideCurrent();
	_getPage();


})();

module.exports = Load;