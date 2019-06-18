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
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = insertHTML + buildMessageHTML(message)
      });
    .fail(function() {
      console.log('error');
    });
  };
  };
