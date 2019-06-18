  var reloadMessages = function() {
    last_message_id = $('.main-message:last').attr('data-id')
    if (last_message_id === void 0){
      return false;
    }
    $.ajax({
      url: './api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .fail(function() {
      console.log('error');
    });
  };
  };
