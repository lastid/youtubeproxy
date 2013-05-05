var YP = {
	getCurrentProxy: function(){
		return Config.PROXIES[Config.DEFAULT_PROXY];
	},

	getYoutubeUrl: function(videoId){
		return Config.YOUTUBE_URL.replace('{id}', videoId);
	},

	//return an array if the element satisfies OVER_PATTERS in config
	//the array contains 
	//	first value : the video id
	//	second value: the position to display the open link 
	checkOverElement: function(element){
		var overPatterns = Config.OVER_PATTERNS,
			tagName = element.tagName.toLowerCase(),
			i, cfg, firstCheck, match, attributeValue;

		for(i = 0; i < overPatterns.length; ++i){
			cfg = overPatterns[i];
			if(cfg.tag == tagName){
				firstCheck = cfg.firstCheck;
				if(firstCheck){
					attributeValue = element.getAttribute(firstCheck.attribute) || '';
					match = attributeValue.match(firstCheck.pattern);
					if(!match) continue;
				}
				
				attributeValue = element.getAttribute(cfg.attribute) || '';
				match = attributeValue.match(cfg.pattern);

				if(match){
					return [match[1], cfg.displayOutside];
				}	
			}
		}
		
		return null;
	},

	/*** Method to manage options ***/
	getSavedOptions: function(){
		var STORE_KEY  = Config.STORAGE_KEY,
			optionsStr = localStorage.getItem(STORE_KEY),
			options    = null;
		
		if(typeof optionsStr == 'string' && optionsStr[0] != '{'){//Old version (1.1.3), need to update
			options = {proxfreeSubdomain: optionsStr};
			localStorage.setItem(STORE_KEY, JSON.stringify(options));
		}else if(optionsStr){//From version 1.1.4
			options = JSON.parse(optionsStr);
		}

		return options || {};
	},

	saveProxfreeSubdomain: function(value){
		var options = YP.getSavedOptions();
		if(value){
			options.proxfreeSubdomain = value;
		}else{
			delete options.proxfreeSubdomain;
		}

		localStorage.setItem(Config.STORAGE_KEY, JSON.stringify(options));
	},

	getProxfreeSubdomain: function(){
		var savedOptions = YP.getSavedOptions();
		return savedOptions.proxfreeSubdomain || Config.PROXIES.proxfree.defaultSubdomain;
	},

	getAddressBarBehavior: function(){
		return YP.getSavedOptions().addressBarBehavior || 'none';
	},

	saveAddressBarBehavior: function(value){
		var options = YP.getSavedOptions();
		options.addressBarBehavior = value;
		localStorage.setItem(Config.STORAGE_KEY, JSON.stringify(options));
	}
};