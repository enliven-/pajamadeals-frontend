
var app = app || {};

app.ListingsView = Backbone.View.extend({

  el              : $('body'),
  events          : {
                      'click .create' : 'createListing'
                    },

  initialize : function() {
    this.collection = new app.Listings();
    var that = this;
    this.collection.fetch({
      success: function(response) { console.log('fetched data successfully!'); that.render(); },
      error  : function(response) { console.log('error'); }
    });
  },
  

  render : function() {
    var that = this;
    this.collection.fetch({
      success: function(response) { console.log('fetched data successfully!!!'); that.renderListings(); },
      error  : function(response) { console.log('error'); }
    });
  },

  renderListings : function() {
    this.collection.each(function(item) { 
      this.renderListing(item);
    }, this );
  },

  renderListing: function( item ) {
    var listingView = new app.ListingView({ model: item });
    $('#listings-container').append( listingView.render().el );
  },

  renderForm: function(options) {
    var target = options.target_sel;
    $.get('/partials/listing-form.mst', function(template) {
      var rendered = Mustache.render(template);
      $('#form-container').html(rendered);
    });
  },

  createListing : function() {
    var listing   = new app.Listing();
    this.collection.create( listing.attributes );
    toast('Your listing has been created.')
  }

});