$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var html = `<div class="main-message">
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
  
  $(".input-box").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-messages').append(html);
      $('.input-details__message').val('');
      $('.input-details__file[type="file"]').val(null);
      $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight },'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
  });
});