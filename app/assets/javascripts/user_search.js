$(document).on('turbolinks:load',function(){
  function appendhtml_search_results_users(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  };

  function appendhtml_search_results_users_none(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').append(html);
  };

  function appendhtml_add_user_to_chatmember(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#chat-group-users').append(html);
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
          appendhtml_search_results_users(user);
        }
        });
      }else{
        appendhtml_search_results_users_none('一致するユーザーはありません。');
      };
    })
    .fail(function () {
      alert('ユーザー検索に失敗しました。');
    })
  });

  $('#user-search-result').on('click','.user-search-add', function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendhtml_add_user_to_chatmember(id, name);
  });

  $('#chat-group-users').on('click','.user-search-remove', function(){
    $(this).parent().remove();
  });
});