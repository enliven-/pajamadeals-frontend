var app = app || {};

app.BooksView = Backbone.View.extend({
  // tagName       : 'div',
  // className     : 'books',

  el         : $('.container'),

  initialize : function() {
    this.collection = new app.Books();
    var that = this;
    this.collection.fetch({
      success: function(response) { that.render(); },
      error  : function(response) { console.log('error'); }
    });
  },
  
  render : function() {
    this.collection.each(function(item) { 
      this.renderBook(item);
    }, this );
  },

  renderBook : function(item) {
    var bookView = new app.BookView({ model: item });
    this.$el.append( bookView.render().el );
  },

  addBook : function(e) {
    e.preventDefault();
    var book = new app.Book();
  }

});