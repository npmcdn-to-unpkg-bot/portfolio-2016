
  // Constructor for adding background images to
  // content blocks
  var BackgroundImage = function(element, $) {
    var that = this
    this.$element = $(element);
    this.$image = this.$element.find('img');

    _.each(this.$image.toArray(), function(img) {

      if (img) {
        // Check if image has already loaded and replace background immediately
        if (that.imageComplete(img) ) {
          that.replaceBackground();
        } else {
          var img = $(img)
          // Otherwise wait for image load
          img.on('load', function() {          
            that.replaceBackground();
          }.bind(that));
        }
      }
    })
      

  };

  // Adds/Replaces background image on the content block
  // from the hidden image picturefill loads.
  BackgroundImage.prototype.replaceBackground = function() {
    var that = this;
    var sources = [];

    _.each(this.$image.toArray(), function(img) {
      sources.push('url(' + (img.currentSrc || img.src) + ')');
      img.remove()
    })

    that.$element.css({
      'background-image': sources
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