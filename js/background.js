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

chrome.extension.onMessage.addListener(function(message){
	switch(message.action){
		case 'openVideo'      : openVideo(message.id);break;
		case 'openOptionsPage': chrome.tabs.create({url: "options.html"});break;
	}
});
