event_manager = {
  listeners : {},
  addListener : function(event,context,method)
  {
    if (this.listeners[event]==undefined){
      this.listeners[event] = []
    }
    this.listeners[event].push({context:context,method:method})
  },
  trigger : function(event,data)
  {
    eventListeners = this.listeners[event]
    for (listener in eventListeners){
      context = eventListeners[listener].context
      method = eventListeners[listener].method
      if(data!=undefined)
        method.call(context.getInstance(),data)
      else
        method.call(context.getInstance())
    }
  },

  removeAllListeners:function(){
    this.listeners = {}

  },

  getInstance : function(){
    return this;
  }
}