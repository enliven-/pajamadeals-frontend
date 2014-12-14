var app = app || {};

app.OrderView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'order',

  events    : {
    'click .cancel'   : 'cancelOrder',
  },


  render : function(options) {
    var template = $('#order-template').html();
    var context = $.extend({}, this.model.listing,  this.model.toJSON());
    var rendered = Mustache.render(template, context);
    this.$el.html( rendered );
    if (context.status === 'cancelled') { this.$el.find('a').addClass('disabled'); }
    return this;
  },



  cancelOrder : function() {
    var that = this;
    if (this.model.toJSON().status === 'cancelled') { return false; }
    setTimeout(function() { $('#toast-container').remove(); toast('Cancelling order.'); }, 200);
    this.model.cancel({
      success : function() { $('#toast-container').remove(); toast('Order cancelled', '3000'); that.render(); },
      error   : function() { $('#toast-container').remove(); toast('Error cancelling order', '3000'); }
    });
  },

});