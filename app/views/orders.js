
var app = app || {};

app.OrdersView = Backbone.View.extend({

  tagName       : 'div',
  className     : 'orders',

  target_sel    : '#orders-container',

  events        : {
                    // 'click .cancel'   : 'cancelOrder',
                  },

  initialize : function(options) {
    this.collection = new app.Orders();
    this.options    = options || {};
    var that = this;
    this.collection.fetch({
      // traditional   : true,
      // data          : this.options,
      success: function(response) { that.renderOrders(); },
      error  : function(response) { console.log('error'); }
    });

    this.listenTo(Backbone, 'order:placed', this.updateOrders);
  },

  render : function() {
    $(this.target_sel).html( this.el );

  },

  updateOrders : function() {
    var that = this;
    this.collection.fetch({
      success: function(response) { that.renderOrders();  },
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

