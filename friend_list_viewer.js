friend_list_viewer = {

  create : function(){
  div = document.createElement("DIV");
  div.id = 'friend_list_viewer_div'
  div.className = 'friend_list_viewer'
  div.style.bottom  = "0px"
  div.style.right  = "0px"
  div.style.position  = "fixed"
  div.style.zIndex = "20000999999"
  div.style.display = "block"
  div.style.backgroundColor = 'white'
  div.style.height = "200px"
  div.style.width = "11.5%"
  div.style.overflow = "scroll"
  div.innerHTML = ''
  document.body.appendChild(div)
  $("#friend_list_viewer_div").load(chrome.extension.getURL('templates/friend_list_viewer.html'))
  },
  getInstance : function(){
    return this;
  },

  openChatWindow : function(e){
    console.log('ocw')
    id = $(this).find("#friend_id").html()
    em.trigger('requestToOpenChatWindow',message_controller.getJidFriendly(id))
  },
  addFriend : function(friend){
    profile_photo_link = friend.link
    friendView = '<li class = "friend_view" id="friend_view_'+message_controller.getJidFriendly(friend.id)+'"><div class="profile-image" style = "background-image: url('+profile_photo_link+')"></div><div class="profile-name">'+friend.name+'</div><span style="display:none" id="friend_id">'+friend.id+'</span></li>'
    $("#friend_list_viewer").append(friendView)
    $("#friend_view_"+message_controller.getJidFriendly(friend.id)).bind('click',this.openChatWindow)
  }
}