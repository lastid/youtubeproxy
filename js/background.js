var openVideo = function(id){
	var method = YP.getCurrentProxy().method;

	if(method == 'POST'){
		chrome.tabs.create({url:'opener.html?id=' +id}, function(tab){
		});
	}else{
		alert('Wow, you added a proxy config with ' + method + ' method!.\n\
			  But I haven\'t implemented it yet :| .\n\
			  Send me a feed back on this extension page on webstore or on github (https://github.com/lastid/youtubeproxy).\n\
			  I will implement it. Promise!' );
	}
};

var onNewUrl = function(tabId, changeInfo, tab){
	var addressBarBehavior = YP.getAddressBarBehavior(),
		matches,
		videoId;

	if(addressBarBehavior != 'none'){
		matches = tab.url.match(Config.ADDRESS_BAR_PATTERN);

		if(matches){
			videoId = matches[1];
			if(addressBarBehavior == 'icon'){
				chrome.pageAction.show(tabId);
			}else if(addressBarBehavior == 'open'){
				chrome.tabs.update(tabId, {url: 'opener.html?id=' + videoId});
			}
		}
	}
};

chrome.extension.onMessage.addListener(function(message){
	switch(message.action){
		case 'openVideo'      : openVideo(message.id);break;
		case 'openOptionsPage': chrome.tabs.create({url: "options.html"});break;
	}
});

chrome.tabs.onUpdated.addListener(onNewUrl);

chrome.pageAction.onClicked.addListener(function(tab){
	chrome.tabs.update(tab.id, {url: 'opener.html?url=' + tab.url});
});