function message_controller(from,to,text,type){
  this.text = text
  this.from = from
  this.to = to
  this.type = type
}

message_controller.getJidFriendly = function(jid){
  return jid.replace(/@.*/,'')
}

message_controller.getJidFull = function (jidFriendly){
  return jidFriendly+'@localhost'
}

message_controller.getJidWithoutResource = function(jid){
  return jid.replace(/\/.*/,'')
}

message_controller.prototype.toJSONString = function(){
  var json = {text:this.text,from:this.from,to:this.to,type:this.type}
  return JSON.stringify(json)
}