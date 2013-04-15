var Config = {
	ID: 'youtubeProxy',
	
	OVER_PATTERNS: [
	    {
	    	tag: 'img',
	    	attribute: 'src',
	    	pattern: '[A-Za-z0-9]+\.ytimg\.com(?:/|%2F)vi(?:/|%2F)([A-Za-z0-9-_]+)(?:/|%2F)'
	    	//On youtube
	    	//http://i3.ytimg.com/vi/JoVQTPbD6UY/default.jpg
	    	//On facebook
	    	//https://fbexternal-a.akamaihd.net/safe_image.php?d=AQCmNnEhwEBgBtGk&url=http%3A%2F%2Fi3.ytimg.com%2Fvi%2Fz-j_ah0OZes%2Fmqdefault.jpg&jq=100	
	    }, 
	    {
	    	tag: 'object',
	    	attribute: 'data',
	    	pattern: '\.youtube\.com/v/([A-Za-z0-9-_]+)?'
	    	//On yakaz
	    	//http://www.youtube.com/v/WFxpPUgF5UQ?enablejsapi=1&playerapiid=ytplayer
	    },
	    {
	    	tag: 'iframe',
	    	attribute: 'src',
	    	pattern: '\.youtube\.com/embed/([A-Za-z0-9-_]+)', //http://www.youtube.com/embed/bmxr75CV36A?rel=0
	    	displayOutside: true //because over a flash element, z-index does not help
	    },
	    {
	    	tag: 'embed',
	    	firstCheck:{ //need this because flashvars is huge, regex on it can be costly
	    		attribute: 'src',
	    		pattern: 's\.ytimg\.com/' //http://s.ytimg.com/yts/swfbin/watch_as3-vfle2krMl.swf
	    	},
	    	attribute: 'flashvars',
	    	pattern: '(?:&|%26|^)video_id(?:=|%3D)([A-Za-z0-9-_]+)(?:&|%26|$)', //video on youtube website
	    	displayOutside: true
	    },
	    {
	    	tag: 'video',
	    	attribute: 'data-youtube-id',
	    	pattern: '([A-Za-z0-9-_]+)',
	    	displayOutside: true
	    }
	],
	
	YOUTUBE_URL: 'http://www.youtube.com/watch?v={id}',
	
	DEFAULT_PROXY: 'proxfree',
	
	PROXIES: {
		proxfree: {
			method: 'POST',
			action: 'http://eu.proxfree.com/request.php?do=go',
			urlField: 'get',
			defaultParams: {}
		}
	},
	
	LINK_STYLE: 'z-index:1000000;cursor:pointer;text-shadow:black 1px 0px 2px;border-radius:3px;position:absolute;height:20px;padding:3px;background:rgba(255, 122, 50, 0.7);color:white;',
	
	INJECT_CONTENT: 'Use proxy'
};