/* Globals */
var win = gui.Window.get();
var isMaximized = false;

/* Thigns to do once */

fs.readFile('config/config.json', 'utf-8', function(err, data){
	if (err) throw err;
	config = JSON.parse(data);
	console.log(config);
	films.parseDir();
});


/* init routines/watchers/listeners */
win.on('maximize', function() {
	isMaximized = true;
});
win.on('unmaximize', function() {
	isMaximized = false;
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