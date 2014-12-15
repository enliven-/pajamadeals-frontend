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
    setTimeout(function(){ toast('Processing order.'); }, 500);
	console.log( localStorage.getItem('name') )
	return false;
    var data  = {
                  listing_id : this.model.id,
                  buyer_attributes : { name : localStorage.getItem('name'), mobile : localStorage.getItem('mobile'), college_id : 30 }
                };
    var order = new app.Order();

    order.save(data, {
      success : function(model, response) {
                  $('#toast-container').remove();
                  setTimeout(function() { toast('Order placed.', '3000'); }, 500);
                  Backbone.trigger('order:placed');
                },
      error   : function(m, r, o) {
                  console.log(m); console.log(r);
                  toast('Error placing order.', '3000');
                }
    });
  }

});
