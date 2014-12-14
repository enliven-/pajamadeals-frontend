
var app = app || {};

app.OrdersView = Backbone.View.extend({

  tagName       : 'div',
  className     : 'orders',
  target_sel    : '#orders-container',
  flag          : false,

  initialize : function(options) {
    this.collection = new app.Orders();
    this.options    = options || {};
    var that = this;
    this.collection.fetch({
      // traditional   : true,
      // data          : this.options,
      success: function(response) { that.renderOrders(); },
      error  : function(response) { toast('Error loading orders', '3000'); }
    });

    this.listenTo(Backbone, 'order:placed', this.updateOrders);
  },

  render : function() {
    // $(this.target_sel).html( this.el );
    renderPreloader( $(this.target_sel) );
    this.renderOrders();
    $(this.target_sel).html()
  },

  updateOrders : function() {
    var that = this;
    this.collection.fetch({
      success: function(response) {  },
      error  : function(response) { toast('Error loading orders', '3000'); this.flag = true; }
    });
  },

  renderOrders : function() {
    // this.$el.html('');
    $(this.target_sel).html('');
    this.collection.each(function(item) { 
      this.renderOrder(item);
    }, this );
  },

  renderOrder: function( item ) {
    var orderView = new app.OrderView({ model: item });
    // this.$el.append( orderView.render().el );
    $(this.target_sel).append( orderView.render().el );
  },

});

