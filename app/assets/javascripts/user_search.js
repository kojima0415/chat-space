$(document).on('turbolinks:load',function(){
  function appendhtml_users(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  };

  function appendhtml_none(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').append(html);
  };

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
