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
		
		//sometime the image element is wrapped in a div, and the former is cropped 
		//because of the latter's height
		if(getStyle(el, 'position') == 'absolute' && getStyle(parent, 'position') == 'relative'
			&& getStyle(parent, 'overflow') == 'hidden' && el.offsetHeight > parent.offsetHeight){
			top += (el.offsetHeight - parent.offsetHeight) / 2;
		}

		return [left, top];
	};
	
	var onClick = function(e){
		chrome.extension.sendMessage(null, {action: 'openVideo', id: this.getAttribute('data-id')});
	};
	
	var createLink = function(){
		var el = document.createElement('div');
		
		el.id = Config.ID;
		el.style.cssText = Config.LINK_STYLE;
		el.innerHTML = Config.INJECT_CONTENT;
		el.addEventListener('mouseover', function(){
			clearTimeout(timeoutHide);
		});
		el.addEventListener('mouseout', hide);
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
			
			//console.log('over ', id, pos);
			
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
			//console.log('out');
			timeoutHide = setTimeout(hide, 200);
		}
	}, false);
}();