function render(template_sel, target_sel, context) {
  var template = $(template_sel).html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, context);
  $(target_sel).html(rendered);
}

var uniqiden_fields = ['university', 'college', 'branch', 'semester', 'subject', 'bookset_id'];
var bookset_fields  = ['bookset_id', 'books_ids'];
var book_fields     = ['id', 'title', 'author', 'edition', 'publication', 'mrp', 'img_src'];

function parseObj(object, args) {
  var response = { };
  $.each(args, function(i, arg) {
    response[arg] = object.get(arg)
  });
  return response;
}

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
