 /* requiring */
var gui = require('nw.gui');
// var $ = require('jquery');

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
	// $('.film-thumbnail-container .overlay').height($('.film-thumbnail').height());
}

/*function calculateThumbnailMargin() {
	// var thumbWidth = ($('.film-thumbnail-container')[0]).width();
	console.log($('.film-thumbnail-container'));
	var thumbWidth = 184;
	console.log("++++++++++++++++++++++++++");
	console.log(($('.film-thumbnail-container')[0]));
	console.log("++++++++++++++++++++++++++");
	console.log("thumbWidth: " + thumbWidth);
	// console.log("width: " + $(window).width() + " height: " + $(window).height());
	var ww = $(window).width();
	console.log(ww);
	var thumbs = $('.film-thumbnail-container');
	console.log(thumbs);
	for(var j = 0; j<20; j++){
		console.log(thumbs[j].offsetTop);
	}
	var i = 0;
	var thumbsInRow = 0;
	while(thumbs[thumbsInRow].offsetTop === 15 || thumbs[thumbsInRow].offsetTop === 0)
		thumbsInRow++;
	console.log("ROW: " + thumbsInRow);
	var marginRest = ww - (thumbsInRow * thumbWidth + (thumbsInRow - 1) * 5);
	var marginRestPerThumb = marginRest / thumbsInRow;
	$('#info').width(marginRest).html(marginRest + 'px');
	if (marginRest < thumbWidth+4.5) {
		thumbs.css({ 'margin-left' : marginRestPerThumb / 2, 'margin-right' : marginRestPerThumb / 2 });
	} else {
		thumbs.css({ 'margin-left' : 0, 'margin-right' : 0 });

	}
}*/