var app   = app || {};

app.Order = Backbone.Model.extend({
  urlRoot  :  'http://backend.pajamadeals.in/orders',
  // urlRoot  : $.host + '/orders',

  cancel   :  function(options) {
                var success_fn = options.success;
                var error_fn   = options.error;
                var that = this;
                $.ajax({
                  type    : 'PUT',
                  url     : that.urlRoot,
                  data    : { id : that.id, status : 'cancelled' },
                  success : function(r) { that.attributes = r; console.log(that.toJSON()); success_fn(); },
                  error   : function(r) { error_fn(); }
                });
              },
});