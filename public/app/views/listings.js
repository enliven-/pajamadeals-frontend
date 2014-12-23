
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
    
    this.listenTo(Backbone, 'listing:created', this.updateListings);
  },
  
  render : function(options) {
    var refreshFlag = options.refresh;
    var appendFlag  = options.append;
    // var next        = options.next;

    var that = this;
    if (refreshFlag) {
      renderPreloader( $(this.target_sel) );
      this.collection.fetch({
        traditional   : true,
        data          : this.options,
        success: function(response) { console.log('refreshing'); that.renderListings(appendFlag); },
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

  updateListings : function() {
    var that = this;
    this.collection.fetch({
      traditional   : true,
      data          : this.options,
      success: function(response) {  },
      error  : function(response) { toast('Error loading listings', '3000'); }
    });
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
    $('input.disable').removeAttr('disabled');
    var data = $('body').find('form.listing').serializeObject();
    delete data.title
    delete data.authors
    delete data.publication
    delete data['sug-price']
    var listing   = new app.Listing(data);
    // setTimeout(function() { toast('Processing your listing', '3000'); }, 200);
    if (data.price.trim()==='') { toast('Error creating listing', '3000'); return false; }
    var that = this;
    this.collection.create( listing.attributes, {
      success : function() { 
                  toast('Your listing has been created!', '3000'); 
                  $('body form .form-close').click(); 
                  $('#listings').click(); 
                  setTimeout(function() {  that.render({refresh: true, append: false}); }, 500);
                },
      error   : function() { toast('Error creating listing', '3000'); }
    } );
    
  },




});