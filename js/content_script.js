!function(){

	var body = window.document.body,
		timeoutHide;
	
	var getStyle = function(el, property){
		return window.getComputedStyle(el)[property];
	};
	
	var getPosition = function(el){
		var left = 0, top = 0,
			current = el,
			parent = el.parentNode;
		
		if (current.offsetParent) {//http://www.quirksmode.org/js/findpos.html
			do {
				left += current.offsetLeft;
				top  += current.offsetTop;
			} while (current = current.offsetParent);
		}

		//Reddit companion have a toolbar on top, which add a margin top to the html tag
		//the offsetParent test cannot go further than the body tag, so we need to 
		//manually add it here.
		if(document.documentElement.offsetTop){
			top += document.documentElement.offsetTop;
		}

		//sometime the image element is wrapped in a div, and the former is cropped 
		//because of the latter's height
		if(getStyle(el, 'position') == 'absolute' && getStyle(parent, 'position') == 'relative'
			&& getStyle(parent, 'overflow') == 'hidden' && el.offsetHeight > parent.offsetHeight){
			top += (el.offsetHeight - parent.offsetHeight) / 2;
		}

		return [left, top];
	};
	
	var onClick = function(e){
		
		if(e.target.tagName.toLowerCase() == 'img'){
			chrome.extension.sendMessage(null, {action: 'openOptionsPage'});
		}else{
			chrome.extension.sendMessage(null, {action: 'openVideo', id: this.getAttribute('data-id')});
		}
	};

	var timeoutHideFn = function(){
		timeoutHide = setTimeout(hide, 200);
	};

	var createLink = function(){
		var el = document.createElement('div');
		
		el.id = Config.ID;
		el.style.cssText = Config.LINK_STYLE;
		el.innerHTML = Config.INJECT_CONTENT + '&nbsp;&nbsp;<img style="margin:0;padding:0;" title="Settings" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC7klEQVR4XnVTTU8TXRQ+M9RGaLWVDylJXbG2SSkbAiUBIy0EpLFdmLhoJREkJLqo0Z3/wJAgRCQBAauYouSFF5fUmAJ583ZhUaQiLWXawjQObbVThFI7xzsESiLlmZzck2fuc3Luc+6lEBHywWKxtLS2tr6iKAr7+/stHo9nDvKA/psYHh4u7enpOV9ZWWm71m5SmC0WpcFguGW322W9vb3l8DcQ8SAcDse9f2ZmhOejo6zTOclvsVHc3GJxOxbD/UwGp6enky8cDtblcglPBwfvHOkkQFBSUkI/6R+4r63SUfKiQpXIZbNZ2N3dA5qmIJFIQENj4zmaps9JJGeA47iHADCYO0IsFhMmXr2cQkGAxI8fkEzywGwwwDAMsCwLqVTqoGAmkyHrbxgZGXl9woOrTU16gRTYT2fgq88HpWVlcEGpFEpLywSVSgVerxfS6f2DQgajsTFXoLu7u6Wvr48zGo0agfxM8UnQaDQwP+8O1dXVmnVVWqvb7d6+TLhwKAQ8n4K2tjYdmQxXW1t7BRoaGh9EuW30rX7Dpc/LOL+wiH7/Ora3mx4dGXW7s3NozR/AhcX/kAmFMMgwxNw46vX19+hUit/NpPdAyAogeiAKFEoF1Nfr6+AQNTU1OplMRsyMQ5J0QJGPJ52KWiBQ2Gy2d2R0bCgcwY/eJSRG4tTUFE5MvP7pdDqTk2/eIBuN4v8eDwaCGzg6Ph4RNaI2dw/MZvNAaucXRja3cM71Hr9zHH4iR1r+soIME8J/Z2dxecWHQZI3Nzc/Pr4Hh9BqtdcLJAVQVFQIly6pIbgehCwiUACkXR4ulpeDUqEAgXDV1dU3CG0ncVwgyfPrZ6VS1a+dHSwuLga5XE7F4gmgKErMAQnICPGMVErH43H/iatMoCAP6G1FRcUttVp999va2p7YbnCDQX8gwBO+i/CdJpPprbg3pyNJ3ng2NLQaiUQwHA5jR0fHh9P2SeAU3OnqqrFarQ4xHxsbu0leKeTDH7XM2bgTsr34AAAAAElFTkSuQmCC" />';
		el.addEventListener('mouseover', function(){
			clearTimeout(timeoutHide);
		});
		el.addEventListener('mouseout', function(e){
			timeoutHideFn();
		});
		el.addEventListener('click', onClick);
		body.appendChild(el);
		return el;
	};
	
	var hide = function(){
		document.getElementById(Config.ID).style.display = 'none';
	};
	
	body.addEventListener('mouseover', function(e){
		var target = e.target,
			detected = YP.checkOverElement(target);
		
		if(detected){
			var	videoId			= detected[0],
				displayOutside	= detected[1],
				pos				= getPosition(target),
				linkEl			= document.getElementById(Config.ID);
			
			target[Config.ID] = true;
			if(!linkEl){
				linkEl = createLink();
			}
			
			linkEl.setAttribute('data-id', videoId); 
			linkEl.style.display = 'block';
			linkEl.style.left = (pos[0] + target.offsetWidth - linkEl.offsetWidth) + 'px';
			if(displayOutside){
				linkEl.style.top  = (pos[1] - linkEl.offsetHeight) + 'px';
			}else{
				linkEl.style.top  = pos[1] + 'px';
			}
			
			
		}
		
	}, false);
	
	body.addEventListener('mouseout', function(e){
		if(e.target[Config.ID] == true){
			timeoutHideFn();
		}
	}, false);
}();