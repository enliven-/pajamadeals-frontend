
var app = app || {};

app.ListingsView = Backbone.View.extend({

  el              : $('body'),
  events          : {
                      'click .create' : 'createListing'
                    },

  initialize : function(models) {
    this.collection = new app.Listings(models);
    var that = this;
    this.collection.fetch({
      success: function(response) { console.log('initialized and fetched data successfully!'); },
      error  : function(response) { toast('Error loading listings', '3000');  }
    });
  },
  

  render : function(options) {
    // renderPreloader($('#listings-container'));
    var refreshFlag = options.refresh;
    if (refreshFlag) { 
      this.collection = new app.Listings();
      var that = this;
      this.collection.fetch({
        success: function(response) { console.log('fetched data successfully!!!'); that.renderListings(); },
        error  : function(response) { console.log('error'); }
      });
    } else {
      this.renderListings();
    }
  },

  renderListings : function(collection) {
    $('#listings-container').html('');
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
    $('input.disable').removeAttr('disabled');
    var data      = this.$el.find('form.listing').serializeObject();
    console.log(data);
    delete data.title
    delete data.authors
    delete data.publication
    delete data['sug-price']
    delete data.mrp
    var listing   = new app.Listing(data);
    console.log(listing.toJSON())
    // return false;
    setTimeout(function() { toast('Processing your listing'); }, 500);
    this.collection.create( listing.attributes, {
      success : function() { $('#toast-container').remove(); toast('Your listing has been created!'); $('#listings').click(); },
      error   : function() { toast('Error creating listing'); }
    } );
    
  },




});