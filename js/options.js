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

var link           = document.createElement('a'),
	subdomainInput = getById('subdomainInput');

link.href = Config.PROXIES.proxfree.action;

getById('protocol').innerHTML = link.protocol;
subdomainInput.value = localStorage.getItem(STORE_KEY) || Config.PROXIES.proxfree.defaultSubdomain;
getById('proxyfreeLink').innerHTML = unescape(link.hostname).replace('{subdomain}', '');

getById('btnSave').onclick = function(){
	localStorage.setItem(STORE_KEY, subdomainInput.value);
};

getById('btnReset').onclick = function(){
	localStorage.removeItem(STORE_KEY);
	subdomainInput.value = Config.PROXIES.proxfree.defaultSubdomain;
};