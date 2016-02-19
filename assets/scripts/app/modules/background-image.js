
  // Constructor for adding background images to
  // content blocks
  var BackgroundImage = function(element, $) {
    this.$element = $(element);
    this.$image = this.$element.find('img');

    if (this.$image.length) {
      // Check if image has already loaded and replace background immediately
      if (this.imageComplete(this.$image[0]) ) {
        this.replaceBackground();
      }
      // Otherwise wait for image load
      this.$image.on('load', function() {
        this.replaceBackground();
      }.bind(this));
    }
  };

  // Adds/Replaces background image on the content block
  // from the hidden image picturefill loads.
  BackgroundImage.prototype.replaceBackground = function() {
    var source = this.$image[0].currentSrc || this.$image[0].src;
    this.$element.css({
      'background-image': 'url(' + source + ')'
    });
  };

  BackgroundImage.prototype.imageComplete = function(image) {
    if (image.complete) {
      return true;
    }

    // Or we can check the natural dimensions
    if (typeof(image.naturalWidth) !== 'undefined' && image.naturalWidth > 0) {
      return true;
    }

    // Guess not =[
    return false;
  };

  BackgroundImage.prototype.load = function($) {
    $('.js-background-image').each(function() {
      var backgroundImage = new BackgroundImage(this, $);
    });
  };

  module.exports = BackgroundImage;