var app   = app || {};

app.Listing = Backbone.Model.extend({
  urlRoot   : 'http://backend.pajamadeals.in/listings',
  // urlRoot  : $.host + '/listings',
  defaults  : {
    book_id           : 2,
    // price             : 400,
    user_attributes   : { name : localStorage.getItem('name'), mobile : localStorage.getItem('mobile'), college_id : 30},
    // quality           : 0,
    // markings          : 2,
  }
});