var app   = app || {};

app.Listing = Backbone.Model.extend({
  urlRoot   : $.host + '/listings',
  defaults  : {
    book_id           : 2,
    // price             : 400,
    user_attributes   : { name : 'Viksit Arora', mobile : '9156420350', college_id : 30},
    // quality           : 0,
    // markings          : 2,
  }
});