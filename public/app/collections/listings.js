var app   = app || {};

app.Listings = Backbone.Collection.extend({
  model   : app.Listing,
  // url     : $.host + '/listings'
  url     : 'http://backend.pajamadeals.in/listings'
});