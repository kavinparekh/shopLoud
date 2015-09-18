
console.log('assigned')
em  = event_manager.getInstance()
cm = chat_manager.getInstance()
im = interface_manager.getInstance()
fm = friend_manager.getInstance()
em.addListener('connected',im,im.showConnected)
em.addListener('connected',fm,fm.askForFriendsOnline)
em.addListener('messageReceived',im,im.showMessage)
em.addListener('sendMessage',cm,cm.sendMessage)
em.addListener('sendMessage',cm,cm.sendMessageToMyself)
em.addListener('sendFriendManagerMessage',cm,cm.sendFriendManagerMessage)
em.addListener('friendManagerMessageReceived',fm,fm.receiveFriendManagerMessage)
em.addListener('friendAdded',im,im.addFriend)
em.addListener('friendRemoved',im,im.removeFriend)
em.addListener('disconnect',cm,cm.disconnect)
em.addListener('disconnect',fm,fm.destroy)
em.addListener('disconnect',em,em.removeAllListeners)
em.addListener('createChatWindowComplete',im,im.flushMessageQueue)
em.addListener('requestToSendMessage',im,im.sendMessage)
em.addListener('requestToOpenChatWindow',im,im.openChatWindow)
em.addListener('chatWindowClosed',im,im.closeChatWindow)
em.addListener('pageUnloaded',cm,cm.write_status)
em.addListener('hideInterface',im,im.hideInterface)
em.addListener('unHideInterface',im,im.unHideInterface)
window.onbeforeunload = function(event)
    {
        em.trigger('pageUnloaded')
    };
    
$(document).keydown(function(e){
var tag = e.target.tagName.toLowerCase();
if (e.keyCode==90 && tag != 'input' && tag != 'textarea' ){
  if(im.isHidden)
    em.trigger('unHideInterface')
  else
    em.trigger('hideInterface')
}
});

chrome.extension.sendMessage({ method: "getTabId" }, function(res) {
  tabId = res.data;
  chrome.runtime.sendMessage({method: "getLocalStorage",key:"currentTab"}, function(res) {
    if(res.data!=undefined){
      chrome.runtime.sendMessage({method: "setLocalStorage",key:"currentTab",value:tabId}, function(response) { 
        
      })
      console.log('set key')
      chrome.runtime.sendMessage({method: "getLocalStorage",key:"user_id"}, function(res) {
          user_id = res.data
      chrome.runtime.sendMessage({method: "getLocalStorage",key:"user_password"}, function(res) {
          user_password = res.data
          chrome.runtime.sendMessage({method: "shoploud:ReinitiateLogin",key:"none"}, function(res) {})
      })
    })
      
    }
  });
});

/*chrome.extension.sendMessage({ method: "getTabId" }, function(res) {
  tabId = res.data;
  chrome.runtime.sendMessage({method: "getLocalStorage",key:tabId+"_rid"}, function(response) {
    rid  = response.data
    chrome.runtime.sendMessage({method: "getLocalStorage",key:tabId+"_sid"}, function(response) {
      sid = response.data
      chrome.runtime.sendMessage({method: "getLocalStorage",key:tabId+"_jid"}, function(response) {
        jid = response.data
        if(rid!=undefined)
        chat_manager.getInstance().attach_connection(jid,sid,parseInt(rid))
      });
    });
  });
});*/