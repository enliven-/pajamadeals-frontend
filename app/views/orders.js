
var app = app || {};

app.OrdersView = Backbone.View.extend({

  el        : $('#orders-container'),

  initialize : function(options) {
    this.collection = new app.Orders();
    this.options    = options || {};
    var that = this;
    this.collection.fetch({
      traditional   : true,
      data          : this.options,
      success: function(response) { console.log('fetched orders successfully!'); },
      error  : function(response) { console.log('error'); }
    });
  },

  render : function(options) {
    renderPreloader($('#orders-container'));
    var refreshFlag = options.refresh;
    if (refreshFlag) {
      var that = this;
      this.collection.fetch({
        // traditional   : true,
        // data          : this.options,
        success: function(response) { console.log('fetched orders successfully!!!'); that.renderOrders(); },
        error  : function(response) { console.log('error'); }
      });
    } else {
      this.renderOrders();
    }
  },

  renderOrders : function() {
    $('#orders-container').html('');
    this.collection.each(function(item) { 
      this.renderOrder(item);
    }, this );
  },

  renderOrder: function( item ) {
    var orderView = new app.OrderView({ model: item });
    this.$el.append( orderView.render().el );
    // $('#orders-container').append( orderView.render().el )
  },

});

