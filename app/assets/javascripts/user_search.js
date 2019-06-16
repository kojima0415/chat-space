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
      }else if (users.length !== 0) {
        users.forEach(function(user){
        if (!$("#chat-group-user-" + user.id).length){
        appendhtml_users(user);
        }
        });
      }else{
        appendhtml_none('一致するユーザーはありません。');
      };
    })
  });
