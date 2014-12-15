var app   = app || {};

app.Listing = Backbone.Model.extend({
  urlRoot   : 'http://backend.pajamadeals.in/listings',
  // urlRoot  : $.host + '/listings',
  defaults  : {
    user_attributes   : { name : localStorage.getItem("name"), mobile : localStorage.getItem("mobile"), college_id : localStorage.getItem("college_id") },
  }
});