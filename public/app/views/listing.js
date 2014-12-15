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
    console.log(that.model.toJSON())
    $.get('/partials/listing.mst', function(template) {
      var rendered = Mustache.render(template, that.model.toJSON() );
      that.$el.html( rendered );
    });
    return that;
  },

  placeOrder : function() {
    setTimeout(function(){ toast('Processing order.', '3000'); }, 200);
    var data  = {
                  listing_id : this.model.id,
                  buyer_attributes :  { 
                                        name        : localStorage.getItem('name'), 
                                        mobile      : localStorage.getItem('mobile'),
                                        college_id  :  localStorage.getItem('collge_id')
                                      }
                };
    var order = new app.Order();

    order.save(data, {
      success : function(model, response) {
                  $('#toast-container').remove();
                  setTimeout(function() { toast('Order placed.', '3000'); }, 200);
                  Backbone.trigger('order:placed');
                },
      error   : function(m, r, o) {
                  toast('Error placing order.', '3000');
                }
    });
  }

});
