$(function(){
 	$('#target article').focus();
 	
	$('.glossary a').click(function(e){
		e.preventDefault();
		$('#target article').append($(this).text())
		
	})
	$('#target').click(function(){
		$('#target article').focus();	
	
	});
	$(".glossary").hover(
		 function() {
                 $(this).addClass('hover');
                 
            }, 
             function(){ 
                $(this).removeClass('hover');
             }
	)
/*
	$('#target article').on('activate', function() {
    $(this).empty();
    var range, sel;
    if ( (sel = document.selection) && document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(this);
        range.select();
    }
	});

	$('#target article').focus(function() {
    if (this.hasChildNodes() && document.createRange && window.getSelection) {
        $(this).empty();
        var range = document.createRange();
        range.selectNodeContents(this);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
	});
*/
})