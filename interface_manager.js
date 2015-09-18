interface_manager = {
  chatWindows : {},
  friendListViewer : null,
  isHidden: false,
  sendMessage1: function()
  {

    text = $("#message").val()
    user = $('#receiver').get(0).value
    message = new message_controller(null,user,text,'sent')
    em.trigger('sendMessage',message)

  },
  
  hideInterface:function(){
    $(".chat_window").hide()
    $(".friend_list_viewer").hide()
    this.isHidden = true;
  },
  unHideInterface:function(){
    $(".chat_window").show()
    $(".friend_list_viewer").show()
    this.isHidden = false;
  },

  disconnect:function(){
    $('#connect').hide()
    em.trigger('disconnect')

  },
  showConnected : function()
  {
    $('#landingMenu').html('')
    /*$('#connect').show()
    $('#connect').get(0).value = 'disconnect'
    $('#connect').bind('click',this.disconnect)
    $('#menu').html("<label for='message'>message</label><input type='text' id='message' /><input type='button' id='send' value='send' />")
    $("#send").bind('click',this.sendMessage1)*/
    this.friendListViewer = friend_list_viewer.getInstance()
    this.friendListViewer.create()
  },

  sendMessage: function(messageObj){
    jidFriendly = chat_window.convertDivIdToJid(messageObj.cw_id)
    jidFull = message_controller.getJidFull(jidFriendly)
    message = new message_controller(null,jidFull,messageObj.text,'sent')
    em.trigger('sendMessage',message)

  },

  showMessage : function(myMessage)
  {
    if(myMessage.type=='received')
      jidFriendly = message_controller.getJidFriendly(myMessage.from)
    if(myMessage.type=='sent')
      jidFriendly = message_controller.getJidFriendly(myMessage.to)
    if(typeof this.chatWindows[jidFriendly] != 'undefined'){
      cw = this.chatWindows[jidFriendly]
    }
    else{
      serialNumber = Object.keys(this.chatWindows).length+1
      cw = new chat_window(jidFriendly,serialNumber)
      this.chatWindows[jidFriendly] = cw;
    }
    this.chatWindows[jidFriendly].showMessage(myMessage)
  },

  openChatWindow : function(friendId){
    if(typeof this.chatWindows[friendId] != 'undefined'){
      cw = this.chatWindows[friendId]
    }
    else{
      serialNumber = Object.keys(this.chatWindows).length+1
      cw = new chat_window(friendId,serialNumber)
      this.chatWindows[friendId] = cw;
    }
  },
    closeChatWindow : function(chatWindowId){
    jidFriendly = chat_window.convertDivIdToJid(chatWindowId)
    if(typeof this.chatWindows[jidFriendly] != 'undefined'){
      delete this.chatWindows[jidFriendly]
    }
  },

  flushMessageQueue : function(divId){
    jidFriendly = chat_window.convertDivIdToJid(divId)
    cw = this.chatWindows[jidFriendly]
    cw.flushMessageQueue()
  },

  getUserId: function(){

  },

  getPassword: function(){
    chrome.runtime.sendMessage({method: "getLocalStorage",key:"user_password"}, function(response) {
       return response.data
     })
  },

  addFriend:function(friend){
    console.log(friend.name + ' is online')
    this.friendListViewer.addFriend(friend)
  },

  removeFriend:function(friend){
    console.log(friend.name + ' is offline')
    this.friendListViewer.removeFriend(friend)
  },
   getChatWindowCount : function(){
     return Object.keys(this.chatWindows).length
   },


  getInstance : function(){
    return this;
  }



}