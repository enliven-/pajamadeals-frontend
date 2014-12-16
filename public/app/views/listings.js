
var app = app || {};

app.ListingsView = Backbone.View.extend({

  tagName       : 'div',
  className     : 'listings',
  target_sel    : '#listings-container',

  events          : {
                      'click .create' : 'createListing'
                    },



  initialize : function(models, options) {
    if ( ! $.isEmptyObject(models) ) {
      this.collection = new app.Listings(models);
    } else {
      this.options    = options || {};
      this.collection = new app.Listings();
      var that = this;
      this.collection.fetch({
        traditional   : true,
        data          : this.options,
        success: function(response) {  },
        error  : function(response) { toast('Error loading listings', '3000');  }
      });
    }
  },
  
  render : function(options) {

    var refreshFlag = options.refresh;
    var appendFlag  = options.append;

    var that = this;
    if (refreshFlag) {
      renderPreloader( $(this.target_sel) );
      this.collection.fetch({
        traditional   : true,
        data          : this.options,
        success: function(response) { that.renderListings(appendFlag); },
        error  : function(response) { toast('Error loading listings', '3000');  }
      });
    } else {
      this.renderListings(appendFlag);
    }
    
  },

  renderListings : function(appendFlag) {
    if (!appendFlag) { $(this.target_sel).html(''); }
    
    removePreloader( $(this.target_sel) );
    this.collection.each(function(item) { 
      this.renderListing(item);
    }, this );
  },

  renderListing: function( item ) {
    var listingView = new app.ListingView({ model: item });
    $(this.target_sel).append( listingView.render().el );
  },

  renderForm: function(options) {
    var target = options.target_sel;
    $.get('/partials/listing-form.mst', function(template) {
      var rendered = Mustache.render(template);
      $('#form-container').html('');
      $('#form-container').html(rendered);
    });
  },

  createListing : function() {
    console.log('sssss')
    $('input.disable').removeAttr('disabled');
    // hack!!
    // var data      = this.$el.find('form.listing').serializeObject();
    var data = $('body').find('form.listing').serializeObject();
    console.log(data);
    delete data.title
    delete data.authors
    delete data.publication
    delete data['sug-price']
    delete data.mrp
    var listing   = new app.Listing(data);
    console.log(listing.toJSON())
    setTimeout(function() { toast('Processing your listing', '3000'); }, 200);
    this.collection.create( listing.attributes, {
      success : function() { toast('Your listing has been created!', '3000'); $('#listings').click(); },
      error   : function() { toast('Error creating listing', '3000'); }
    } );
    
  },




});