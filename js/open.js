var proxy = YP.getCurrentProxy(),
	videoId = window.location.href.match('id=(.*)')[1],
	url = YP.getYoutubeUrl(videoId);

var form = document.createElement('form');
form.action = proxy.action;
form.method = proxy.method;

var fieldsHtml = '<input value="' + url+ '" name="' + proxy.urlField +'" type="hidden" />';

for(var i in proxy.defaultParams){
	fieldsHtml += '<input value="' + proxy.defaultParams[i]+ '" name="' + i +'" type="hidden" />';
}

form.innerHTML = fieldsHtml;
form.submit();