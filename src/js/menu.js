$('#menu-button').click(function(e){
	e.preventDefault();
	$('#films-detail').fadeOut();
	$('body').toggleClass(function(){
		console.log($('body').hasClass('menu-open').toString());
		if ($(this).hasClass('menu-open') === false) {
			$('#menu-search-input').focus();
		}
		return 'menu-open';
	});
});
$('#menu').mouseleave(function(e){
	e.preventDefault();
	setTimeout(function() {
		$('body').removeClass('menu-open');
	}
	, 250);
});

$('.menu-item-1').click(function(e){
	e.stopPropagation();
	var oldState = $(e.currentTarget).children('ul').css('display');
	console.log(oldState);
	$('.menu-item-1 ul')/*.not(e.currentTarget)*/.slideUp();
	$('.menu-item-1').children('i').removeClass('fa-rotate-90');
	if (oldState == 'none') {
		$(this).children('ul').slideToggle();
		$(this).children('i').addClass('fa-rotate-90');
	}
	toggleActiveTab($(this).attr('tab'));
});
$('.menu-item-1 *').click(function(event) {
	event.stopPropagation();
});