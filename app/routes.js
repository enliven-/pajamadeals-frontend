var Router = Backbone.Router.extend({
  routes: {
    'listings'        : 'home',
    'new'             : 'new',
    ':id/edit'        : 'edit',
    'orders/:refresh' : 'orders',
    ''                : 'home',
  }
});
var params        = { mobile : '9975454384'}


app.router        = new Router;
var ordersView    = new app.OrdersView(params);
var listingsView  = new app.ListingsView();


// initialize
listingsView.render({ refresh : true });
// listingsView.renderForm();

app.router
  .on('route:home', function() {
  })

  .on('route:new', function() {
  })

  .on('route:orders', function(params) {
    ordersView.render();
  });

Backbone.history.start();