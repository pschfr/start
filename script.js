//setup
$(function() {
	refreshAllBinds();
	SetNewBackground();
	$("ul.subMenu").hide();
	$("li:has(ul)").click(function(){
		$("ul",this).slideToggle(100);
		$("a.parent", this).toggleClass('active');
	});
});

//aux functions
function SetNewBackground(){
	var TOTAL_BACKGROUND_PRESETS = 15; //update this if you add/remove presets
	var randNum = Math.floor((Math.random() * TOTAL_BACKGROUND_PRESETS));
	$('body').attr('class',function(i, c){
    		return c.replace(/(^|\s)bg\S+/g, '');
			})
			.addClass('bg' + (Math.floor((Math.random() * TOTAL_BACKGROUND_PRESETS)) + 1));
}
function refreshAllBinds() {
	resetAllBinds();
	setGlobalBinds();
	setSpecificBinds();
	
}
function resetAllBinds(){
	Mousetrap.reset();
}
function setGlobalBinds(){
	Mousetrap.bind('esc', function(e) {
		$('.subMenu').slideUp(100);
		$('li a').removeClass('active');
		refreshAllBinds();
	});
 
	Mousetrap.bind('space', function(e){
		$('.subMenu').slideUp(100);
		$('li a').removeClass('active');
		refreshAllBinds();
		SetNewBackground();
	});
}
function setSpecificBinds(){
	var parents = $('.parent');	
	$.each(parents, function(i, val){
		Mousetrap.bind($(val).children('span').text(), function(e) {
			var parentDiv = $('a#'+$(val).attr('id'));
			parentDiv.next().slideToggle(100);
			parentDiv.toggleClass('active');
			var sons = $(val).parent().find(".tab span"); 
			$.each(sons, function(i, val){
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href= $(val).parent().attr('href');
				})
			});
			
			Mousetrap.bind($(val).children('span').text(), function(e) {
				$('.subMenu').slideUp(100);
				$('li a').removeClass('active');
				refreshAllBinds();
			})
		})
	})
}