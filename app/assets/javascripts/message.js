  var reloadMessages = function() {
    last_message_id = $('.main-message:last').attr('data-id')
    if (last_message_id === void 0){
      return false;
    }
  };
