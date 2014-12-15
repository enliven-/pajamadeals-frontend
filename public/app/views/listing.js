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
    var image_url = that.model.toJSON()['image']['thumb'];
    that.model.set('image_url', image_url);
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
                                        name        : localStorage.getItem("name"), 
                                        mobile      : localStorage.getItem("mobile"),
                                        college_id  :  localStorage.getItem("college_id")
                                      }
                };
    var order = new app.Order();
    console.log(data);
    order.save(data, {
      success : function(model, response) {
                  $('#toast-container').remove();
                  setTimeout(function() { toast('Order placed.', '3000'); }, 200);
                  Backbone.trigger('order:placed');
                  console.log(model);
                  console.log(response);
                },
      error   : function(m, r, o) {
                  toast('Error placing order.', '3000');
                }
    });
  }

});
