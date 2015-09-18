friend_manager = {
  friendManagerUserId : 'presence@localhost/ChatBot',
  requestToAskForFriendsOnline : 'shoploud:askForFriendsOnline',
  friendsOnline : [],

  askForFriendsOnline: function(username){

    var text = this.requestToAskForFriendsOnline
    var user = this.friendManagerUserId
    var message = new message_controller(null,user,text,'askForFriendsOnline')
    em.trigger('sendFriendManagerMessage',message)

  },


  addFriend: function(friend){
    var found = false;
    for(var i = 0; i < this.friendsOnline.length; i++) {
    if (this.friendsOnline[i].id == friend.id) {
        found = true;
        break;
      }
    }
    if(!found){
      this.friendsOnline.push(friend)
       em.trigger('friendAdded',friend)
    }
   

  },

  removeFriend: function(friend){
    var index = this.friendsOnline.indexOf(friend);
    this.friendsOnline.splice(index, 1);
    em.trigger('friendRemoved',friend)

  },

  receiveFriendManagerMessage: function(message){
    presenceText = Strophe.getText(message.getElementsByTagName('body')[1]).replace(/&quot;/g,'"')
    console.log(presenceText)
    presenceObj = JSON.parse(presenceText)
    friendsToAdd = presenceObj.friendsToAdd
    for (friend in friendsToAdd)
      this.addFriend(friendsToAdd[friend])
    friendsToRemove = presenceObj.friendsToRemove
    for (friend in friendsToRemove){
      this.removeFriend(friendsToRemove[friend])
    }



  },
  
  getFriendFromId : function(friendId){
    for (friend in this.friendsOnline){
      curr = this.friendsOnline[friend]
      if(friendId == curr.id)
      return curr;
    }
    return undefined
  },

  destroy: function(){
    this.friendsOnline = []

  },

  getInstance : function(){
    return this;
  }




}