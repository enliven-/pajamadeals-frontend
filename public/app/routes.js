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
  })

  .on('route:user', function(params) {

  });
Backbone.history.start();