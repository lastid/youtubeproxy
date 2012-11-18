var YP = {
	getCurrentProxy: function(){
		return Config.PROXIES[Config.DEFAULT_PROXY];
	},

	getYoutubeUrl: function(videoId){
		return Config.YOUTUBE_URL.replace('{id}', videoId);
	},
	
	//return an array if the element satifies OVER_PATTERS in config
	//the array contains 
	//	first value : the video id
	//	second value: the position to display the open link 
	checkOverElement: function(element){
		var overPatterns = Config.OVER_PATTERNS,
			tagName = element.tagName.toLowerCase(),
			i, cfg, firstCheck, match;

		for(i = 0; i < overPatterns.length; ++i){
			cfg = overPatterns[i];
			if(cfg.tag == tagName){
				firstCheck = cfg.firstCheck;
				if(firstCheck){
					match = element.getAttribute(firstCheck.attribute).match(firstCheck.pattern);
					if(!match) continue;
				}
				
				match = element.getAttribute(cfg.attribute).match(cfg.pattern);
				if(match){
					return [match[1], cfg.displayOutside];
				}	
			}
		}
		
		return null;
	}
};