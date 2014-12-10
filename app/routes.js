var Router = Backbone.Router.extend({
  routes: {
    'listings'        : 'home',
    'new'             : 'new',
    ':id/edit'        : 'edit',
    'orders'          : 'orders',
    ''                : 'home',
  }
});

app.router        = new Router;
var myOrders      = new app.OrdersView();
var listingsView  = new app.ListingsView();


app.router
  .on('route:home', function() {
    listingsView.render();
    setTimeout(function(){ Waves.displayEffect(); }, 1000);
  })

  .on('route:new', function() {
    listingsView.renderForm();
  })

  .on('route:orders', function() {
    console.log('yes!')
    myOrders.render();
  });

Backbone.history.start();