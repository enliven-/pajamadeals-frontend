var app   = app || {};

app.Book = Backbone.Model.extend({
  // urlRoot  : 'http://backend.pajamadeals.in/books',
  urlRoot  : $.host + '/books',
  defaults : {
    "university"  : "Pune University"
  }
});