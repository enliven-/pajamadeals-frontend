var app = app || {};

app.OrderView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'order',

  events    : {
    'click .cancel'   : 'cancelOrder',
  },

  // render: function() {
  //   var that = this;
  //   $.get('/partials/order.mst', function(template) {
  //     var context = $.extend({}, that.model.listing,  that.model.toJSON());
  //     var rendered = Mustache.render(template, context);
  //     that.$el.html( rendered );
  //     if (context.status === 'cancelled') { that.$el.find('a').addClass('disabled'); }
  //     console.log('1')
  //   });
  //   console.log('2')
  //   return that;
  // },

  render : function() {
    console.log('render order')
    var template = $('#order-template').html();
    console.log(this.model.listing)
    var context = $.extend({}, this.model.listing,  this.model.toJSON());
    console.log(context)
    var rendered = Mustache.render(template, context);
    this.$el.html( rendered );
    if (context.status === 'cancelled') { this.$el.find('a').addClass('disabled'); }
    console.log(1)
    // console.log(rendered)
    return this;
  },

  cancelOrder : function() {
    if (this.model.toJSON().status === 'cancelled') { return false; }
    this.model.cancel();
  },

});