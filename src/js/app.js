/* Globals */
var win = gui.Window.get();
var isMaximized = false;

/* Thigns to do once */
// calculateThumbnailMargin();
// $('.film-thumbnail-container .overlay').height($('.film-thumbnail').height());


/* init routines/watchers/listeners */
win.on('maximize', function() {
	isMaximized = true;
});
win.on('unmaximize', function() {
	isMaximized = false;
});

$('#menu-button').click(function(e){
	e.preventDefault();
	$('body').toggleClass('menu-open');
});
$('#menu').blur(function(e){
	e.preventDefault();
	$('#info').html('menu-open');
});

$('.menu-item-1').click(function(e){
	e.stopPropagation();
    $(this).children('ul').slideToggle();
    $(this).children('i').toggleClass('fa-rotate-90');
    toggleActiveTab($(this).attr('tab'));
});
$('.menu-item-1 *').click(function(event) {
	event.stopPropagation();
});

var mousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
	mousePos.x = event.pageX;
	mousePos.y = event.pageY;
});

$(window).resize(function() {
	// calculateThumbnailMargin();
});


/* Fonctions */
function toggleMaximize() {
	console.log(win);
	if (isMaximized === true) {
		win.unmaximize();
	} else {
		win.maximize();
	}
}

function toggleActiveTab(elem) {
	$('.tabswitch-button').removeClass('active');
	$('.container-body').removeClass('active');
	$('#button-' + elem).addClass('active');
	$('#content-' + elem).addClass('active');
}