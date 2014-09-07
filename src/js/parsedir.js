var fs = require('fs');
var path = require('path');

var filmsFolder = "F:\\Videos\\Films";
var filmsList = [];

function getDirectories() {
	return fs.readdirSync(filmsFolder).filter(function (file) {
		return fs.statSync(path.join(filmsFolder, file)).isDirectory();
	});
}

var dirs = getDirectories();
for(var i in dirs){
	filmsList[i] = {"title": dirs[i], "imageUrl" : "http://fr.web.img1.acsta.net/medias/nmedia/18/95/15/80/20495053.jpg"};
}
console.log(filmsList);
$('#content-films-list').html(Mustache.render($('#content-films-list').html(), {films : filmsList}));