$(document).ready(function() {

  var refreshListingsFlag = false;

  $('.button-collapse').sideNav({menuWidth: 240, activationWidth: 70});
  $('ul.tabs').tabs();

  $('body').on('click', '.nav-logo > a', function(e) {
    e.preventDefault();
    window.location = window.location.origin;
  });

  $('#listings').on('click', function(e) {
    console.log('listings!')
    app.router.trigger('route:home')
  });

  $('#orders').on('click', function(e) {
    app.router.trigger('route:orders')
  });

  $('#orders').on('click', function(e) {
  });

  $('#nav-listings').on('click', function(e){
    e.preventDefault();
    $('#listings').click();
    $('#nav-mobile').animate( { "left": "-=240px" }, "slow");
    $('#sidenav-overlay').remove();
  });

  $('#nav-orders').on('click', function(e){
    e.preventDefault();
    $('#orders').click();
    $('#nav-mobile').animate( { "left": "-=240px" }, "slow");
    $('#sidenav-overlay').remove();
  });

  $('#nav-new').on('click', function(e){
    e.preventDefault();
    $('#new').click();
    $('#nav-mobile').animate( { "left": "-=240px" }, "slow");
    $('#sidenav-overlay').remove();
  });

  $('#nav-user').on('click', function(e){
    e.preventDefault();
    $('#nav-mobile').animate( { "left": "-=240px" }, "slow");
    $('#sidenav-overlay').remove();
  });

  $('body').on('click', 'ul.tabs a', function(e) {
    blur_search();
  });

  $('body').on('click', 'ul.side-nav a', function(e) {
    blur_search();
  });



  $.widget( "ui.autocomplete", $.ui.autocomplete, {
    _renderMenu : function( ul, items ) {
      console.log(items);
                    var that = this;
                    $.each( items, function( index, item ) {
                      that._renderItemData( ul, item );
                    });
                    $( ul ).addClass("collection");
                  },
    _renderItem : function( ul, item ) {
                    return $( "<li>" )
                      .addClass("collection-item")
                      .append( item.title )
                      .append( "<br>")
                      .append( item.authors )
                      .append( "<br>")
                      .append( item.publication )
                      .appendTo( ul );
                  }
  });



  $("#search").autocomplete({
    source      : function(req, resp_fn) {
                    var term = req.term.toLowerCase();
                    console.log(term)
                    console.log(app.params);
                    $.ajax({
                      // url       : $.host + '/listings?q='+term,
                      url       : 'http://backend.pajamadeals.in/listings?q='+term,
                      data      : app.params,
                      dataType  : 'json',
                      success   : function(response) {
                                    // var results = _.filter(response, function(item) { return item.title.toLowerCase().indexOf(term) != -1; } );
                                    results = response;
                                    var filteredView = new app.ListingsView(results, {});
                                    $('#listings-container').html('');
                                    filteredView.render({refresh: false});
                                  },
                      error     : function(response) { console.log('error in autocomplete'); }
                    });
                  },
    minLength   : 4,
    messages    : {
                    noResults   : '',
                    results     : function() {}
                  },
    search      : function(event, ui) {
                    renderPreloader($('#listings-container'));
                  },
    select      : function( event, ui ) {
                    // populateAndShowForm(ui.item);
                    // $('#title').val(book.title);
                    // console.log('lll')
                  }
  });


  $("#title").autocomplete({
    source      : function(req, resp_fn) {
                    var term = req.term.toLowerCase();
                    $.ajax({
                      // url       : $.host + '/books?q='+term,
                      url       : 'http://backend.pajamadeals.in/books?q='+term,
                      data      : app.params,
                      dataType  : 'json',
                      success   : function(response) {
                                    var results = _.filter(response, function(item) { return item.title.toLowerCase().indexOf(term) != -1; } );
                                    resp_fn(results)
                                  },
                      error     : function(response) { console.log('error in autocomplete'); }
                    });
                  },
    minLength   : 4,
    messages    : {
                    noResults   : '',
                    results     : function() {}
                  },
    select      : function( event, ui ) {
                    populateAndShowForm(ui.item);
                    $('#title').attr('disabled', '').val(book.title);
                  }
  });



  var populateAndShowForm = function(book) {
    $('#title').val(book.title);
    $('input.book-id').val(book.id);
    $('#authors').val(book.authors);
    $('#publication').val(book.publication);
    $('#sug-price').val(300);


    $('form input[type=text] + label').addClass('active');
    $('#form-container .hide.hidden').removeClass('hidden');
  };

  var focus_search = function() {
    $('#listings').click();
    $('.brand-logo').html('');
    $('.search-input').removeClass('hidden').focus();
    $('.search').removeClass('search').addClass('search-close').find('i').removeClass().addClass('mdi-navigation-close');
    refreshListingsFlag = true;
  };

  var blur_search  = function() {
    $('.brand-logo').addClass('hidden');
    $('.search-input').blur().addClass('hidden').val('');
    $('nav .brand-logo').html('pajamadeals');
    $('.search-close').removeClass('search-close').addClass('search').find('i').removeClass().addClass('mdi-action-search');
    if (refreshListingsFlag) { 
      app.listingsView.render({refresh : false});
      refreshListingsFlag = false;
    }
  };


  $('.nav-wrapper').on('click', '.search', function(e) {
    e.preventDefault();
    focus_search();
  });

  $('.nav-wrapper').on('click', '.search-close', function(e) {
    e.preventDefault();
    blur_search();
  });

 
  var clearForm = function() {
    $('form input[type="text"]').each(function() {
        $(this).val("");  
    });
    $('form input[type="radio"]').each(function() {
        $(this).prop('checked', false);
    });
  }

  $('body').on('click', '.form-close', function(e) {
    clearForm();
    $('#form-container .hide').addClass('hidden');
    $('#title').removeAttr('disabled').focus();
  });

});