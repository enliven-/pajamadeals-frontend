var app   = app || {};

app.Books = Backbone.Collection.extend({
  model   : app.Book,
  url     : $.host + '/books',
  // url     : 'http://backend.pajamadeals.in/books'
});