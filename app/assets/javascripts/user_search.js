  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (input.length ==0 ) {
      }else{
        appendhtml_none('一致するユーザーはありません。');
      };
    })
  });
