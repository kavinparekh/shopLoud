var successURL = 'localhost/?#access_token';
console.log('calllllled')
function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=200,width=150');
       if (window.focus) {newwindow.focus()}
       return false;
     }
     
function onFacebookLogin(){
  console.log('called')
  if (!localStorage.getItem('accessToken')) {
    chrome.tabs.query({}, function(tabs) { // get all tabs from every window
      for (var i = 0; i < tabs.length; i++) {
        console.log(tabs[i].url)
        if (tabs[i].url.indexOf(successURL) !== -1) {
          // below you get string like this: access_token=...&expires_in=...
          var params = tabs[i].url.split('#')[1];

          // in my extension I have used mootools method: parseQueryString. The following code is just an example ;)
          var accessToken = params.split('&')[0];
          accessToken = accessToken.split('=')[1];

          localStorage.setItem('accessToken', accessToken);
          chrome.tabs.remove(tabs[i].id);
        }
      }
    });
  }
}

//chrome.tabs.onUpdated.addListener(onFacebookLogin);
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
 console.log('script called')
 localStorage["currentTab"] = tab.id
if(localStorage[tab.id+"_rid"]!=undefined){
  chrome.tabs.executeScript(tab.id, {file: "attach_session.js"}, function(){})
}
else
chrome.tabs.executeScript(tab.id, {file: "menu.js"}, function(){})

});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
if(typeof message =="string" && message.search(/shoploud:initiateLogin/)>-1){
  message = JSON.parse(message)
localStorage["user_id"] = message.id
localStorage["user_password"] = message.password
 chrome.tabs.executeScript(parseInt(localStorage["currentTab"]), {file: "start_session.js"}, function(){});
}

}
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if(typeof request.method =="string" && request.method.search(/shoploud:ReinitiateLogin/)>-1){
 chrome.tabs.executeScript(parseInt(localStorage["currentTab"]), {file: "start_session.js"}, function(){});
}

}
);

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
	console.log('adsadasd')
chrome.tabs.query({active: true}, function(tabs) {
  console.log(tabs[0].url)
 chrome.tabs.executeScript(parseInt(localStorage["currentTab"]), {file: "start_session.js"}, function(){

  });
});
  });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage")
      sendResponse({data: localStorage[request.key]});
    else
    if(request.method == "setLocalStorage")
       localStorage[request.key] = request.value
    else
    if ( request.method == "getTabId" )
        {
            sendResponse({ data: sender.tab.id });
        }
    else
    if ( request.method == "delLocalStorage" )
        {
            localStorage.removeItem(request.key)
        }
    else
      sendResponse({}); // snub them.
});

chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {

    }
);

chrome.tabs.onRemoved.addListener(function (tabId,removeInfo){
  chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_rid"}, function(response) {})
  chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_sid"}, function(response) {})
  chrome.runtime.sendMessage({method: "delLocalStorage",key:tabId+"_jid"}, function(response) {})



})




