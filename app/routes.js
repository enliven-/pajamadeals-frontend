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
var params        = { mobile : '9975454384'}
var myOrders      = new app.OrdersView(params);
var listingsView  = new app.ListingsView();


// initialize
listingsView.render();

app.router
  .on('route:home', function() {
    renderPreloader($('#listings-container'));
    listingsView.render();
    setTimeout(function(){ Waves.displayEffect(); }, 300);
  })

  .on('route:new', function() {
    listingsView.renderForm();
  })

  .on('route:orders', function() {
    renderPreloader($('#orders-container'));
    myOrders.render();
    setTimeout(function(){ Waves.displayEffect(); }, 300);
  });

Backbone.history.start();