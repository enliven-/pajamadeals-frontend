var app = app || {};

app.OrderView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'order',

  events    : {
    'click .cancel'   : 'cancelOrder',
  },


  render : function(options) {
    var template = $('#order-template').html();
    var listing  = this.model.toJSON().listing;
    var image_url = listing.image.thumb;
    if (image_url === null) { image_url = '/assets/images/images.png' }
    else { image_url = 'http://backend.pajamadeals.in' + image_url; }
    var context = $.extend({}, listing,  this.model.toJSON());
    context["image_url"] = image_url
    var rendered = Mustache.render(template, context);
    this.$el.html( rendered );
    if (context.status === 'cancelled') { this.$el.find('a').addClass('disabled'); }
    return this;
  },



  cancelOrder : function() {
    var that = this;
    if (this.model.toJSON().status === 'cancelled') { return false; }
    // setTimeout(function() { toast('Cancelling order.', '3000'); }, 200);
    this.model.cancel({
      success : function() { $('#toast-container').remove(); toast('Order cancelled', '3000'); that.render(); },
      error   : function() { $('#toast-container').remove(); toast('Error cancelling order', '3000'); }
    });
  },

});