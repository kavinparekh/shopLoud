
chat_manager = {
  BOSH_SERVICE : 'http://localhost:5280/http-bind',
  connection : null,
  rawInput : function (data)
    {
      console.log('RECV: ' + data);
    },
  rawOutput : function (data)
    {
      console.log('SENT: ' + data);
    },
  log : function(msg)
  {
    console.log(msg)
  },
  write_status : function(){
    jid = this.connection.jid
    rid  = this.connection._proto.rid
    sid = this.connection._proto.sid
    if(rid!=undefined && rid!=null){
      chrome.extension.sendMessage({ method: "getTabId" }, function(res) {
        tabId = res.data;
        chrome.runtime.sendMessage({method: "setLocalStorage",key:tabId+"_rid",value:rid}, function(response) {})
        chrome.runtime.sendMessage({method: "setLocalStorage",key:tabId+"_sid",value:sid}, function(response) {})
        chrome.runtime.sendMessage({method: "setLocalStorage",key:tabId+"_jid",value:jid}, function(response) {})
      });
    }
  },
  init_connection : function(username,password)
  {
    cm_i = this.getInstance();
    chrome.runtime.sendMessage({method: "getLocalStorage",key:"user_id"}, function(response) {
       username = response.data
       chrome.runtime.sendMessage({method: "getLocalStorage",key:"user_password"}, function(response) {
       password =  response.data
       cm_i.connection = new Strophe.Connection(cm_i.BOSH_SERVICE);
       cm_i.connection.rawInput = cm_i.rawInput;
       cm_i.connection.rawOutput = cm_i.rawOutput;
       cm_i.connection.connect(username,password,cm_i.onConnect);
       cm_i.connection.addHandler(cm_i.onMessage, null, 'message')
      })
     })
  },
  attach_connection : function(jid,sid,rid)
  {
    this.connection = new Strophe.Connection(this.BOSH_SERVICE);
    this.connection.rawInput = this.rawInput;
    this.connection.rawOutput = this.rawOutput;
    this.connection.attach(jid,sid,rid,this.onConnect);
    this.connection.addHandler(this.onMessage, null, 'message')

  },
  onConnect: function (status)
  {
      if (status == Strophe.Status.CONNECTING) {
	      cm.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
	      cm.log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
	      cm.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
	      cm.log('Strophe is disconnected.');
	      em.trigger('disconnected')
    } else if (status == Strophe.Status.CONNECTED ||status ==  Strophe.Status.ATTACHED) {
        cm.log('Strophe is connected.');
        em.trigger('connected')
    }
  },

  onMessage : function (message){
    body = message.getElementsByTagName('body')[0].innerHTML
    from = message.getAttribute('from')
    to = message.getAttribute('to')
    if(from == fm.friendManagerUserId)
      em.trigger('friendManagerMessageReceived',message)
    else{
      if(message_controller.getJidWithoutResource(from) == message_controller.getJidWithoutResource(to)){
        var message = JSON.parse(body)
        myMessage = new message_controller(message.from,message.to,message.text,'sent')
        }
      else{
        myMessage = new message_controller(from,to,body,'received')
        }
      em.trigger('messageReceived',myMessage)
    }

    return true
  },

  sendMessage : function(message){
    jid = this.connection.jid
    var from = Strophe.getNodeFromJid(jid);
    var to = message.to;
    var reply = $msg({
      to: to,
      from: jid,
      type: "chat"
    }).c("body").t(message.text);
   this.connection.send(reply.tree());

  },
  sendMessageToMyself : function(message){
    jid = this.connection.jid
    message.from = jid
    var from = Strophe.getNodeFromJid(jid);
    var reply = $msg({
      to: jid,
      from: to,//doesn't matter
      type: "chat"
    }).c("body").t(message.toJSONString());
   this.connection.send(reply.tree());

  },
  sendFriendManagerMessage: function(message){
    this.sendMessage(message)
  },

  disconnect: function(){
    //this.connection.flush()
    this.connection.disconnect()
    chrome.extension.sendMessage({ method: "getTabId" }, function(res) {
        tabId = res.data;
        chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_rid"}, function(response) {})
        chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_sid"}, function(response) {})
        chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_jid"}, function(response) {})
      });
  },

  getInstance : function(){
    return this;
  }

}


