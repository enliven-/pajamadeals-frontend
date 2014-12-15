var Router = Backbone.Router.extend({
  routes: {
    'listings'        : 'home',
    'new'             : 'new',
    ':id/edit'        : 'edit',
    'orders'          : 'orders',
    'user'            : 'user',
    ''                : 'home',
  }
});
var params        = { mobile : localStorage.getItem('mobile')}
app.router        = new Router;
app.ordersView    = new app.OrdersView(params);
app.listingsView  = new app.ListingsView();


// initialize
app.listingsView.render({ refresh : true });
// listingsView.renderForm();

app.router
  .on('route:home', function() {
  })

  .on('route:new', function() {
  })

  .on('route:orders', function(params) {
    app.ordersView.render();
  });
Backbone.history.start();