$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var message_body_with_or_without  =`${message.body == '' ?
                                        ''
                                        :`<p class="main-message__text">
                                            ${message.body}
                                          </p>`
                                        }`;

    var message_image_with_or_without =`${message.image.url == null ?
                                        ''
                                        :`<img class="lower-message__image" src = ${message.image.url}>`
                                        }`;
    
    var append_html =`<div class="main-message" data-id="${message.id}">
                        <div class="message-details">
                          <p class="message-details__user">
                            ${message.user_name}
                          </p>
                          <p class="message-details__informetion">
                            ${message.created_at}
                          </p>
                        </div>
                        ${message_body_with_or_without}
                        ${message_image_with_or_without}
                      </div>`  
    return append_html;
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
      $(".input-box")[0].reset();
      $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight },'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
    .always(function(){
      $('.input-box__button').removeAttr("disabled");
    });
  });
});