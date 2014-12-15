var app   = app || {};

app.Orders = Backbone.Collection.extend({
  model   : app.Order,
  url     : $.host + '/orders'
  // url     : 'http://backend.pajamadeals.in/orders'
});