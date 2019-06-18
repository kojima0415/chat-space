$(document).on('turbolinks:load',function() {
  var buildMessageHTML = function(message) {
    var html = `<div class="main-message" data-id="${message.id}">
                  <div class="message-details">
                    <p class="message-details__user">
                    ${message.user_name}
                    </p>
                    <p class="message-details__informetion">
                    ${message.created_at}
                    </p>
                  </div>
                  ${message.body == '' ?
                    ''
                    :`<p class="main-message__text">
                        ${message.body}
                      </p>`
                  }
                  ${message.image.url == null ?
                    ''
                    :`<img class="lower-message__image" src = ${message.image.url}>`
                  }
                  </div>`
                return html;
  };

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
      var beforeHTMLheight = $('.main-messages')[0].scrollHeight;
      $('.main-messages').append(insertHTML);
      var afterHTMLheight = $('.main-messages')[0].scrollHeight;
      if (beforeHTMLheight !== afterHTMLheight){
        $('.main-messages').animate({scrollTop: afterHTMLheight },'fast');
      };
    })
    .fail(function() {
      console.log('error');
    });
  };

  var current_url = $(location).attr('href');
  if (current_url.match(/\/groups\/.+\/messages/)){
    });
  };
});