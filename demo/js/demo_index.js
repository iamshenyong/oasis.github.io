function setpages(e)
{
	var id=e.getAttribute("frameid");
	var src=e.getAttribute("pages");
	document.getElementById(id).src = src;
}

function hidden_item(e)
{
	var id=e.getAttribute("frameid");
	var src=e.getAttribute("pages");
	document.getElementById(id).src = src;
}

function hidden_item(e){
	var id=e.getAttribute("groupid");
	var elem = document.getElementById(id).getElementsByTagName("li");
	for(var i = 0; i < elem.length; i++){
		if (elem[i].hasAttribute("hidden")) {
			elem[i].removeAttribute("hidden");
		} else {
			elem[i].setAttribute("hidden", "hidden");
		}
	}
}
