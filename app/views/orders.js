
var app = app || {};

app.OrdersView = Backbone.View.extend({

  el        : $('#orders-container'),

  initialize : function() {
    this.collection = new app.Orders();
    var that = this;
    this.collection.fetch({
      success: function(response) { console.log('fetched orders successfully!'); },
      error  : function(response) { console.log('error'); }
    });
  },

  render : function() {
    var that = this;
    this.collection.fetch({
      success: function(response) { console.log('fetched orders successfully!!!'); that.renderOrders(); },
      error  : function(response) { console.log('error'); }
    });
  },

  renderOrders : function() {
    this.$el.html('');
    this.collection.each(function(item) { 
      this.renderOrder(item);
    }, this );
  },

  renderOrder: function( item ) {
    var orderView = new app.OrderView({ model: item });
    this.$el.append( orderView.render().el );
  },

});

