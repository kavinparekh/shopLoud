
function generateMenu(){
 $('#menu').html("<label for='message'>message</label><input type='text' id='message' /><input type='button' id='send' value='send' />")
 $("#send").bind('click',sendMessage)
}

function popitup(url,windowName) {
       newwindow=window.open(url,windowName,'height=200,width=150');
       if (window.focus) {newwindow.focus()}
       return false;
     }

function loginWithFacebook(){
popitup("https://www.facebook.com/dialog/oauth?client_id=1505703686352698&scope=email,user_friends,public_profile&redirect_uri=http://localhost/complete/facebook","fb");
}

function sendMessage(){
if (connection.connected && connection.authenticated) {
text = $("#message").val()
user = $('#receiver').get(0).value
if (text.length > 0) {
var from = Strophe.getNodeFromJid(connection.jid);
var to = user;
var reply = $msg({
to: user,
from: connection.jid,
type: "chat"
}).c("body").t(text);

connection.send(reply.tree());

user = $('#jid').get(0).value;
var reply = $msg({
to: user,
from: connection.jid,
type: "chat"
}).c("body").t(text);

connection.send(reply.tree());

console.log(connection.jid)
console.log(connection._proto.sid)
console.log(connection._proto.rid)

log(text, "from");
//$("#messages").append(text)
//$('#' + elemid).get(0).value = "";
}
}
else {
log("You have to log in before you can ask "+user);
}
}





$(document).ready(function () {
    $('body').on('click', '#fblogin',loginWithFacebook)
});

