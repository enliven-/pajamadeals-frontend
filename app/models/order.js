var app   = app || {};

app.Order = Backbone.Model.extend({
  urlRoot  :  $.host + '/orders',
  listing  : null,

  initialize : function() {
    this.loadListing();
    console.log('listing loaded')
  },

  cancel   :  function(options) {
                var success_fn = options.success;
                var error_fn   = options.error;
                var that = this;
                $.ajax({
                  type    : 'PUT',
                  url     : that.urlRoot,
                  data    : { id : that.id, status : 'cancelled' },
                  success : function(r) { that.attributes = r; console.log(that.toJSON()); success_fn(); },
                  error   : function(r) { error_fn(); }
                });
              },

  loadListing : function() {
    var that = this;
    $.ajax({
      url      : 'http://localhost:9393/listings',
      dataType : 'json',
      success  : function(response) { 
                  that.listing = _.find(response, function(item) { return item.id === that.toJSON().listing_id });
                 },
      error    : function(r) { console.log('error loadListing'); }
    })
  }
});