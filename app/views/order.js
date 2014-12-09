var app = app || {};

app.OrderView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'order',

  events    : {
    'click .cancel'   : 'cancelOrder',
  },


  render: function() {
    var that = this;
    $.get('/partials/order.mst', function(template) {
      var rendered = Mustache.render(template, that.model.toJSON() );
      that.$el.html( rendered );
    });
    return that;
  },

  cancelOrder : function() {
    this.model.cancel();
  },

});