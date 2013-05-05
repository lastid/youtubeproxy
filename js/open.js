var proxy = YP.getCurrentProxy(),
	i,
	form,
	fieldsHtml,
	matches,
	videoId,
	url;

matches = window.location.href.match('url=(.*)');
if(matches){
	url = matches[1];
}else{
	videoId =  window.location.href.match('id=(.*)')[1];
	url = YP.getYoutubeUrl(videoId); 
}

form = document.createElement('form');
//Should make proxy service agnostic here, the following line only workds with proxfree
form.action = proxy.action.replace('{subdomain}', YP.getProxfreeSubdomain());
form.method = proxy.method;

fieldsHtml = '<input value="' + url+ '" name="' + proxy.urlField +'" type="hidden" />';

for(i in proxy.defaultParams){
	fieldsHtml += '<input value="' + proxy.defaultParams[i]+ '" name="' + i +'" type="hidden" />';
}

form.innerHTML = fieldsHtml;
form.submit();