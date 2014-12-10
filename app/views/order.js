var app = app || {};

app.OrderView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'order',

  events    : {
    'click .cancel'   : 'cancelOrder',
  },

  initialize : function() {
  },

  render: function() {
    var that = this;

    $.get('/partials/order.mst', function(template) {
      var context = $.extend({}, that.model.listing,  that.model.toJSON());
      var rendered = Mustache.render(template, context);
      that.$el.html( rendered );
      if (context.status === 'cancelled') { that.$el.find('a').addClass('disabled'); }
    });
    return that;
  },

  cancelOrder : function() {
    if (this.model.toJSON().status === 'cancelled') { return false; }
    this.model.cancel();
  },

});