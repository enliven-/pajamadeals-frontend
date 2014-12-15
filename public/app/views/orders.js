
var app = app || {};

app.OrdersView = Backbone.View.extend({

  tagName       : 'div',
  className     : 'orders',
  target_sel    : '#orders-container',

  initialize : function(models, options) {
    this.collection = new app.Orders();
    this.options    = options || {};
    var that = this;
    console.log(options)
    this.collection.fetch({
      traditional   : true,
      data          : this.options,
      success: function(response) { console.log('fetced orders'); console.log(response); that.renderOrders(); },
      error  : function(response) { toast('Error loading orders', '3000'); }
    });

    this.listenTo(Backbone, 'order:placed', this.updateOrders);
  },

  render : function() {
    // $(this.target_sel).html( this.el );
    console.log(this.collection.length)
    renderPreloader( $(this.target_sel) );
    this.renderOrders();
  },

  updateOrders : function() {
    console.log('update orders')
    var that = this;
    this.collection.fetch({
      traditional   : true,
      data          : this.options,
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

