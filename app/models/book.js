var app   = app || {};

app.Book = Backbone.Model.extend({
  urlRoot  : $.host + '/books',
  defaults : {
    "university"  : "Pune University"
  }
});