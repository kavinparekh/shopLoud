console.log('exec')
document.addEventListener("shoploud:initiateLogin", function(data) {
    console.log('event about to be sent' + data.detail)
    detail  = JSON.parse(data.detail)
    console.log(JSON.stringify(detail))
    message = {eventType:"shoploud:initiateLogin",id:detail.id,password:detail.password }
    console.log(JSON.stringify(message))
    chrome.runtime.sendMessage(JSON.stringify(message));
    console.log(JSON.stringify(message))
});