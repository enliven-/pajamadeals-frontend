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

var renderPreloader = function($target, append_flag) {
  if (append_flag) {
    var preloader = $('#pre-loader').html();
    $target.append(preloader);
  } else {
    $target.html('');
    var preloader = $('#pre-loader').html();
    $target.html(preloader);
  }
}

var removePreloader = function($target) {
  $target.find('div.preloader-wrapper').remove();
}


var page = 1;


var scrollInAction = false;
$(window).scroll(function() {

  if ($('#listings-container').height() - $(window).scrollTop() < 700) {
    if (scrollInAction) return false;
    var isActive = $('a#listings').hasClass('active');
    if (isActive) {
      renderPreloader($('#listings-container'), true)
      scrollInAction = true;
      $.ajax({
        url   : 'http://backend.pajamadeals.in/listings',
        data  : {page : page+1 },
        success : function(data) {
          var listings = data;
          var listingsView = new app.ListingsView(data);
          listingsView.renderListings();
          page+=1;
          scrollInAction = false;
        },
        error : function(data) { console.log(data); }
      })
    }

  }
});


