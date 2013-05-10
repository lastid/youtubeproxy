var openVideo = function(type, value){
	var method = YP.getCurrentProxy().method;

	if(method == 'POST'){
		chrome.tabs.create({
			url: type == 'id' ? 'opener.html?id=' + value : 'opener.html?url=' + value
		}, function(tab){});
	}else{
		alert('Wow, you added a proxy config with ' + method + ' method!.\n\
			  But I haven\'t implemented it yet :| .\n\
			  Send me a feed back on this extension page on webstore or on github (https://github.com/lastid/youtubeproxy).\n\
			  I will implement it. Promise!' );
	}
};

var onNewUrl = function(tabId, changeInfo, tab){
	var addressBarBehavior = YP.getAddressBarBehavior(),
		matches;

	if(addressBarBehavior != 'none'){
		matches = tab.url.match(Config.ADDRESS_BAR_PATTERN);

		if(matches){
			if(addressBarBehavior == 'icon'){
				chrome.pageAction.show(tabId);
			}else if(addressBarBehavior == 'open'){
				if(tab.incognito){//Open in incognito mode does not work yet.
					chrome.pageAction.show(tabId);
				}else{
					chrome.tabs.update(tabId, {url: 'opener.html?url=' + tab.url});
				}
			}
		}
	}
};

chrome.extension.onMessage.addListener(function(message, sender){
	switch(message.action){
		case 'openVideo'      : openVideo('id', message.id);break;
		case 'openOptionsPage': chrome.tabs.create({url: "options.html"});break;
	}
});

chrome.tabs.onUpdated.addListener(onNewUrl);

chrome.pageAction.onClicked.addListener(function(tab){
	if(tab.incognito){//Open in incognito mode does not work yet.
		openVideo('url', tab.url);
	}else{
		chrome.tabs.update(tab.id, {url: 'opener.html?url=' + tab.url});
	}
});