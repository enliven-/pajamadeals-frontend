var app   = app || {};

app.Order = Backbone.Model.extend({
  urlRoot  :  $.host + '/orders',

  cancel   :  function() {
                var that = this;
                $.ajax({
                  type    : 'PUT',
                  url     : that.urlRoot,
                  data    : { id : that.id, status : 'cancelled' },
                  success : function(r) { console.log('s'); console.log(r); },
                  error   : function(r) { console.log('e'); console.log(r); }
                });
              }
});