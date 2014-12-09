
var app = app || {};

app.OrdersView = Backbone.View.extend({

  el        : $('#orders-container'),

  initialize : function() {
    this.collection = new app.Orders();
  },
  
  render : function() {
    console.log('rendering orders')
    var that = this;
    this.collection.fetch({
      success :   function(response) {
                      that.collection.each(function(item) { 
                        that.renderOrder(item);
                      }, that );
                  },

      error   :   function(response) { 
                    console.log('error');
                  }
    });
  },

  renderOrder: function( item ) {
    var orderView = new app.OrderView({ model: item });
    this.$el.append( orderView.render().el );
  },



});