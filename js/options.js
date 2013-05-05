var STORE_KEY = Config.STORAGE_KEY;

var getById = function(id){
	return document.getElementById(id);
};

function getCleanConfig() {
	var request = new XMLHttpRequest();

	request.open('GET', '/js/config.js', false);
	try{
		request.send(null);
		return request.responseText;
	}catch(e){
		return null;
	}
}

getById('viewConfigLink').onclick = function(){
	var textContainer = getById('textContainer');
	if(textContainer.innerHTML.trim() == ''){
		var text = getCleanConfig();

		if(text){
			textContainer.innerHTML = '<pre>' + text + '</pre>';
		}else{
			textContainer.innerHTML = 'Something went wrong.';
		}
	}
};

/*** Subdomain config  ***/
var link           = document.createElement('a'),
	subdomainInput = getById('subdomainInput');

link.href = Config.PROXIES.proxfree.action;

getById('protocol').innerHTML = link.protocol;
subdomainInput.value = YP.getProxfreeSubdomain();
getById('proxyfreeLink').innerHTML = unescape(link.hostname).replace('{subdomain}', '');

getById('btnSave').onclick = function(){
	YP.saveProxfreeSubdomain(subdomainInput.value);
};

getById('btnReset').onclick = function(){
	YP.saveProxfreeSubdomain(null);
	subdomainInput.value = Config.PROXIES.proxfree.defaultSubdomain;
};

/*** Address bar behavior ***/
var radioBtns = document.querySelectorAll('input[name="detectedInAddressBar"]'),
	behavior  = YP.getAddressBarBehavior(),
	radioBtn;

for(var i = 0; i < radioBtns.length; i++){
	radioBtn = radioBtns[i];
	if(radioBtn.value == behavior){
		radioBtn.checked = true;
	}
	radioBtn.onchange = function(){
		YP.saveAddressBarBehavior(this.value);
	};
}