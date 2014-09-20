var filmsFolder = "F:\\Videos\\Films";
// var filmsList = [];
var compteur = 0;
var nbFilms = 0;

var template = "";
(function($){
	template2 = $('#content-films').html();
})(jQuery);

function getDirectories() {
	return fs.readdirSync(filmsFolder).filter(function (file) {
		return fs.statSync(path.join(filmsFolder, file)).isDirectory();
	});
}

function refreshLibrary(){
	var dirs = getDirectories();
	nbFilm = dirs.length;
	for(var i in dirs){
		findData(dirs[i], i);
		console.log("TOUR " + i + "  " + dirs[i]);
		filmsList[i] = {"title": dirs[i], "path" : path.join(filmsFolder, dirs[i])};
	}
	var filmsList_str = JSON.stringify(filmsList);
	fs.writeFileSync(path.join(filmsFolder, 'library.json'), filmsList_str, "UTF-8");
}


fs.exists(path.join(filmsFolder, 'library.json'), function(exists){
	if (exists) {
		console.log('library.json found');
		fs.readFile(path.join(filmsFolder, 'library.json'), 'utf-8', function(err, data){
			if (err) throw err;
			filmsList = JSON.parse(data);
			$('#content-films').html(Mustache.render($('#content-films').html(), {'films-list' : filmsList})).removeAttr('style');
			for(var film in filmsList){
				for(var i = 1; i <= Math.round(filmsList[film].vote_average / 2); i++){
					$('.overlay .rating').eq(film).append('<i class="fa fa-star"></i>');
				}
				for(i; i <= 5; i++){
					$('.overlay .rating').eq(film).append('<i class="fa fa-star-o"></i>');
				}
				if (filmsList[film].hidden) {
					console.log(filmsList[film].title + ": hidden");
					console.log($('.film-thumbnail-container').eq(film));
					$('.film-thumbnail-container').eq(film).hide();
				}
			}
		});
	} else {
		refreshLibrary();
	}
});

function addToList(queryTitle, data,Tour) {
	compteur++;
	filmsList[Tour] = data;
	filmsList[Tour].queryTitle = queryTitle;
	filmsList[Tour].hidden = false;
	filmsList[Tour].dir_path = path.join(filmsFolder, queryTitle);
	$('#content-films').html(Mustache.render(template2, {'films-list' : filmsList})).removeAttr('style');
	if (compteur == nbFilm) {
		var filmsList_str = JSON.stringify(filmsList);
		fs.writeFileSync(path.join(filmsFolder, 'library.json'), filmsList_str, "UTF-8");
	}
}


function findData(queryTitle, Tour) {
	tmdb.search('movie', {query: queryTitle, language: 'fr'}, function (err, results) {
		if (results.results[0] === undefined ) {
			results.title = queryTitle;
			results.poster_path = "img/movie-placeholder.png";
			addToList(queryTitle, results,Tour);
		} else {
			tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {
				addToList(queryTitle, results, Tour);
			});
		}
	});
}
