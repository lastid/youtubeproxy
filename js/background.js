var openVideo = function(id){
	if(YP.getCurrentProxy().method == 'POST'){
		chrome.tabs.create({url:'opener.html?id=' +id}, function(tab){
		});
	}
};

chrome.extension.onMessage.addListener(function(message){
	switch(message.action){
		case 'openVideo': openVideo(message.id);break;
	}
	//console.log(message);
});