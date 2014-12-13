var app   = app || {};

app.Order = Backbone.Model.extend({
  urlRoot  :  $.host + '/orders',
  listing  : null,

  initialize : function() {
    this.loadListing();
  },

  cancel   :  function() {
                var that = this;
                $.ajax({
                  type    : 'PUT',
                  url     : that.urlRoot,
                  data    : { id : that.id, status : 'cancelled' },
                  success : function(r) { console.log('cancelled order'); console.log(r); app.router.trigger('route:orders'); },
                  error   : function(r) { console.log('errored'); console.log(r); }
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