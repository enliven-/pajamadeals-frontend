var app = app || {};

app.BookView = Backbone.View.extend({
  tagName       : 'div',
  className     : 'book',

  events    : {
    'click .delete': 'deleteBook'
  },

  deleteBook : function() {
    this.model.destroy();
    this.remove();
  },

  render     : function() {
    var that = this;
    $.get('/partials/book.mst', function(template) {
      var rendered = Mustache.render(template, that.model.toJSON() );
      that.$el.html( rendered );
    });
    return that;
  }

});