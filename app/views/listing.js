var app = app || {};

app.ListingView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'listing',

  events    : {
    'click .buy'   : 'placeOrder',
  },

  deleteListing: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    var that = this;
    $.get('/partials/listing2.mst', function(template) {
      var rendered = Mustache.render(template, that.model.toJSON() );
      that.$el.html( rendered );
    });
    return that;
  },

  placeOrder : function() {
    setTimeout(function(){ toast('Processing order.'); }, 500);
    var data  = {
                  listing_id : this.model.id,
                  buyer_attributes : { name : 'Bhushan Lodha', mobile : '9975454384' }
                };
    var order = new app.Order();

    order.save(data, {
      success : function(model, response) {
        $('#toast-container').remove();
        app.router.trigger('route:orders');
        setTimeout(function(){ toast('Order placed.'); }, 500);
      },
      error   : function(m, r, o) { console.log(m); console.log(r); }
    });
  }

});
