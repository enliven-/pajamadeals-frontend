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
listingsView.render({ refresh : true });

app.router
  .on('route:home', function() {
    // listingsView.render({ refresh : true });
    // setTimeout(function(){ Waves.displayEffect(); }, 300);
  })

  .on('route:new', function() {
    listingsView.renderForm();
  })

  .on('route:orders', function() {
    myOrders.render({ refresh : true });
    // setTimeout(function(){ Waves.displayEffect(); }, 300);
  });

Backbone.history.start();