var Translation = function(){
	
	var canvas = $('#translation')

    var current_el = 0;
	var keys = {};
	var hybrid = canvas
	var mode="HYBRID"
	var arrowpressed = false
	function init(){
		
		canvas.swipe({
     swipeLeft: function() { switchHybrid() },
     swipeRight: function() { switchTranslate() },
})
$(document).swipe({
     swipeLeft: function() { switchHybrid() },
     swipeRight: function() { switchTranslate() },
})
		
		canvas.bind('mousedown', function(e){
		console.log("mousedown")
		var pos = getSelectionPosition()
			if(pos <0){
			console.log(1)
				$('span[contenteditable="true"]').each(function (i) {
				$(this).attr('contenteditable',false)
			})
			$('p[contenteditable="true"]').each(function (j) {
				$(this).attr('contenteditable',false)
			})
			}
			

   					
		})
		canvas.bind('mouseup', function(e){
		console.log("mouseup")
			var pos = getSelectionPosition()
			if(pos >-1){
					console.log(2);
			$('span[contenteditable="false"]').each(function (i) {
				$(this).attr('contenteditable',true)
			})
			$('p[contenteditable="false"]').each(function (j) {
				$(this).attr('contenteditable',true)
			})
			
			}
		})
		
		canvas.bind('click', function(e){
		console.log("Click")
			$('span[contenteditable="true"]').each(function (i) {
				$(this).attr('contenteditable',true)
			})
			$('p[contenteditable="true"]').each(function (j) {
				$(this).attr('contenteditable',true)
			})
			var pos = getSelectionPosition()
			var section = $(fx())
			if(section.hasClass("editable")){
				// forgot what i need this for.
			
			}else if(pos >-1) {
          		$(section).after('<p class="editable edit_' + current_el + '" contenteditable="true">&nbsp;</p>');
          		
          		
          		
          		var content = section.html()
				var seg = '<span class="segment" contenteditable="true">'+section.html().substr(0,pos)+"</span>"
          		var seg2= '<span class="segment2" contenteditable="true">'+section.html().substr(pos)+"</span>"
          		$(".edit_" + current_el).before(seg);
          		$(".edit_" + current_el).after(seg2);
          		section.remove();
				$(".edit_" + current_el).focus()
				
				$(".edit_" + current_el).blur(function(e){
					if($(this).text().length <=1){
              		$(this).remove();
				
              		}
					current_el++
				})
			}	
		
		})
		
	}
	
	$(document).keydown(function (e) {
    	keys[e.which] = true;
    	checkKeys(e);
    	if(e.which==8){
   				if(!$(fx()).hasClass("editable")){
				e.preventDefault();}
				else if(getSelectionPosition()<0){
					
				}
					
		}
    	if(!arrowpressed){
    		
			if(!$(document.activeElement).hasClass("editable")){
				
				var section = $(fx());
				var pos = getSelectionPosition();
				if(section.hasClass("editable")){
				// forgot what i need this for.
			
				}else if(pos >-1) {
	    		$(section).after('<p class="editable edit_' + current_el + '" contenteditable="true">&nbsp;</p>');
	          		var content = section.html()
					var seg = '<span class="segment" contenteditable="true">'+section.html().substr(0,pos)+"</span>"
	          		var seg2= '<span class="segment2" contenteditable="true">'+section.html().substr(pos)+"</span>"
	          		
	          		$(".edit_" + current_el).before(seg);
	          		$(".edit_" + current_el).after(seg2);
	          		section.remove()
					$(".edit_" + current_el).focus()
					$(".edit_" + current_el).blur(function(e){
						if($(this).text().length <=1){
	              			$(this).remove();
	              		}
						current_el++
					})
	
	    		
	    		}
				}
   		}
   	
    	
    	
	});
	$(document).keyup(function (e) {
    	delete keys[e.which];
   		
    	
	});
	
	function checkKeys(e){
	
		for (var i in keys) {
			
			
				
			if (keys.hasOwnProperty(38) || keys.hasOwnProperty(40) || keys.hasOwnProperty(37) || 		keys.hasOwnProperty(39) ){
				arrowpressed=true
				
				
			}else{
				arrowpressed =false
			}
		

		if (keys.hasOwnProperty(13)){
			if($(".edit_" + current_el).text().length <=1){
			e.preventDefault();
			
				$(".edit_" + current_el).append('<br class="extra"/> <br class="extra"/>');
			
			}
			
		
		}
		if(keys.hasOwnProperty(17) && keys.hasOwnProperty(84)){
			if(mode=="HYBRID"){
				switchHybrid()
			}else{
				switchTranslate()
				
			}
			
			
			}
       }
	}
/*
	function getCaret(el) { 
		  if (el.selectionStart) { 
		    return el.selectionStart; 
		  } else if (document.selection) { 
		    el.focus(); 
		
		    var r = document.selection.createRange(); 
		    if (r == null) { 
		      return 0; 
		    } 
		
		    var re = el.createTextRange(), 
		        rc = re.duplicate(); 
		    re.moveToBookmark(r.getBookmark()); 
		    rc.setEndPoint('EndToStart', re); 
		
		    return rc.text.length; 
		  }  
		  return 0; 
	}
*/
	function switchTranslate(){
		$('#translation').addClass("hybrid");
				$('#translation').removeClass("translation")
				delete keys[84];
				mode="HYBRID"
	}
	function switchHybrid(){
		mode="TRANSLATION"
				$('#translation').addClass("translation")
				$('#translation').removeClass("hybrid")
				delete keys[84];
	}
	// Returns current element.
	function fx(){
		var target=null;
		  if(window.getSelection)
		  {
		    target=window.getSelection().getRangeAt(0).commonAncestorContainer;
		    return((target.nodeType===1)?target:target.parentNode);
		  }
		  else if(document.selection)
		  {
		    var target=document.selection.createRange().parentElement();
		  }
  			return target;
	}
	
	// returns the current 
	function getSelectionPosition () {
    	var selection = window.getSelection();  
    	if(selection.focusOffset != selection.anchorOffset){
    		return -1;
    	}else{
    		return selection.focusOffset;
    	}
    	
    	
	}
	
	return {
			init: init
	}

}

$(function(){
	window.translation = Translation();
	translation.init();
});