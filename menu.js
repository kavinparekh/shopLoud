
  // No tabs or host permissions needed!
/*  div = document.createElement("DIV");
  //ifrm = document.createElement("IFRAME");
   //ifrm.setAttribute("src", "http://localhost/popup.html");
   //div.appendChild(ifrm)
  div.id = 'landingMenu'

div.style.top  = "0px"
div.style.right  = "0px"
div.style.position  = "fixed"
div.style.zIndex = "20000999999"
div.style.display = "block"
div.style.backgroundColor = 'blue'
div.style.height = "200px"
div.style.width = "200px"
div.style.overflow = "scroll"
document.body.appendChild(div)
$("#landingMenu").load(chrome.extension.getURL('templates/menu.html'))
*/

div = document.createElement("DIV");
//ifrm.setAttribute("src", "http://localhost/blank");
  //ifrm = document.createElement("IFRAME");
   //ifrm.setAttribute("src", "http://localhost/popup.html");
   //div.appendChild(ifrm)
  div.id = 'landingMenu'
div.className='modal-dialog'
// div.style.top  = "0px"
// div.style.right  = "0px"
// div.style.position  = "fixed"
// div.style.zIndex = "20000999999"
// div.style.display = "block"
// div.style.backgroundColor = 'blue'
// div.style.height = "200px"
// div.style.width = "200px"
// div.style.overflow = "scroll"
//div.style.opacity = 0
document.body.appendChild(div)
$("#landingMenu").load(chrome.extension.getURL('templates/menu.html'))

