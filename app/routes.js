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


app.router
  .on('route:home', function() {
    $('#listings-container').html('');
    listingsView.render();
    setTimeout(function(){ Waves.displayEffect(); }, 300);
  })

  .on('route:new', function() {
    listingsView.renderForm();
  })

  .on('route:orders', function() {
    $('#orders-container').html('');
    myOrders.render();
  });

Backbone.history.start();