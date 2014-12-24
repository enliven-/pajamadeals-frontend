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
app.params        = { name : localStorage.getItem("name"), mobile : localStorage.getItem("mobile"), college_id : localStorage.getItem("college_id") };
app.router        = new Router;

app.ordersView    = new app.OrdersView({}, app.params);
app.listingsView  = new app.ListingsView({}, app.params);


// initialize
app.listingsView.render({refresh :  true});

app.router
  .on('route:home', function() {
    setTimeout(function() { console.log('effects loading!'); Waves.displayEffect(); $('.modal-trigger').leanModal(); }, 1500);
  })

  .on('route:new', function() {
  })

  .on('route:orders', function() {
    app.ordersView.render(app.params);
  });
Backbone.history.start();