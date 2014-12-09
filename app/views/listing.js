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
    $.get('/partials/listing.mst', function(template) {
      var rendered = Mustache.render(template, that.model.toJSON() );
      that.$el.html( rendered );
    });
    return that;
  },

  placeOrder : function() {
    return false;
    var data  = {
                  listing_id : this.model.id,
                  buyer_attributes : { name : 'Bhushan Lodha', mobile : '9975454384' }
                };
    var order = new app.Order(data);
    order.save({
      success : function(m, r, o) { console.log(r); },
      error   : function(m, r, o) { console.log(r); }
    });
  }

});