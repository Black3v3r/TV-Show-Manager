var fs = require('fs');
var path = require('path');

var allocine = require('allocine-api');

var filmsFolder = "F:\\Videos\\Films";
var filmsList = [];

function getDirectories() {
	return fs.readdirSync(filmsFolder).filter(function (file) {
		return fs.statSync(path.join(filmsFolder, file)).isDirectory();
	});
}

function refreshLibrary(){
	var dirs = getDirectories();
	for(var i in dirs){
		filmsList[i] = {"title": dirs[i], "imageUrl" : "http://fr.web.img1.acsta.net/medias/nmedia/18/95/15/80/20495053.jpg"};
	}
	console.log(JSON.stringify(filmsList));
	fs.writeFile(path.join(filmsFolder, 'library.json'), JSON.stringify(filmsList), 'utf-8', function(err){
		if (err) throw err;
		console.log('It\'s saved!');
	});
}


fs.exists(path.join(filmsFolder, 'library.json'), function(exists){
	if (exists) {
		console.log('library.json found');
		fs.readFile(path.join(filmsFolder, 'library.json'), 'utf-8', function(err, data){
			if (err) throw err;
			filmsList = JSON.parse(data);
			$('#content-films-list').html(Mustache.render($('#content-films-list').html(), {films : filmsList})).removeAttr('style');
		});
	} else {
		refreshLibrary();
	}
});

function allocineSearch(item) {
	allocine.api('search', {q: 'spiderman', count: 20, filter: 'movie'}, function(results) {
		console.log(results.feed.totalResults);
	});
}
