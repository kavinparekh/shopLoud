function chat_window(jidFriendly,serial_number){
  this.div_id = chat_window.convertJidToDivId(jidFriendly)
  this.serial_number = serial_number
  this.create()
  this.messageQueue = []
}
chat_window.convertJidToDivId = function(jid){
  return "chat-window"+jid
}

chat_window.convertDivIdToJid = function(divId){
  return divId.replace(/chat\-window/,'')
}

chat_window.prototype.create = function(){
  this.state = 'creating'
  div = document.createElement("DIV");
  div.id = this.div_id
  div.className = 'chat_window'
  document.body.appendChild(div)
  $("#"+div.id).load(chrome.extension.getURL('templates/chat_box.html'),this.onLoadComplete)
}

chat_window.prototype.onLoadComplete = function(){
  html = $("#"+this.id).html()
  jid = chat_window.convertDivIdToJid(this.id)
  friend  = fm.getFriendFromId(message_controller.getJidFull(jid))
  html = html.replace(/\${friendName}/,friend.name)
  $("#"+this.id).html(html)
  $("#"+this.id).find('.shout_box').attr('style','right:'+(22.5*(im.getChatWindowCount()))+"%")
  em.trigger('createChatWindowComplete',this.id)
}

chat_window.prototype.flushMessageQueue = function(){
  this.state = 'open'
  for(message in this.messageQueue){
    this.showMessage(this.messageQueue[message])
  }
}

chat_window.prototype.remove = function(){
  $("#"+this.div_id).remove()
}

chat_window.prototype.open = function(){
  if(this.state == 'minimized')
    $('.toggle_chat').slideToggle();
  if(this.state == 'close')
    $('.toggle_chat').show();
  this.state = 'open'
}

chat_window.prototype.minimize = function(){
  if(this.state == 'open')
    $('.toggle_chat').slideToggle();
  this.state = 'minimized'
}

chat_window.prototype.close = function(){
  if(this.state != 'closed')
    $('.toggle_chat').hide();
  this.state = 'closed'
}

chat_window.prototype.showMessage = function(myMessage){
  if(this.state=='creating')
  {
    this.messageQueue.push(myMessage)
  }
  else
  {
  this.open()
  this.addMessage(myMessage)
  }
}

chat_window.prototype.addMessage = function(message){
  name  = message_controller.getJidFriendly(message.from)
  jid = chat_window.convertDivIdToJid(this.div_id)
  friend  = fm.getFriendFromId(message_controller.getJidFull(jid))
  profile_photo_link = friend.link
  var innerHTML = '<div class=\"shout_msg_parent\" >'+
                  '<div class=\"shout_msg\">'+
                  '<div class=\"profile-img-small\" style = "background-image: url('+profile_photo_link+')">'+
                  '</div>'+
                  '<div class=\"message\">'+
                  message.text+
                  '</div>'+
                  '</div>'+
                  '</div>'
  console.log(innerHTML)
  var message_box = $("#"+this.div_id).find('.message_box')
  message_box.append(innerHTML)
  //$(innerHTML).hide().appendTo('.message_box').fadeIn()
  //scroll down to latest message
	var scrolltoh = message_box.scrollHeight;
	message_box.scrollTop(scrolltoh);
}




