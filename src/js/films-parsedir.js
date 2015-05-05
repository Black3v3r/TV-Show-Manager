films = {

	compteur : 0,
	nbFilms : 0,
	template : $('#content-films').html(),
	a : 0,
	genres : [],


	getDirectories : function() {
		return fs.readdirSync(config.filmsFolder).filter(function (file) {
			return fs.statSync(path.join(config.filmsFolder, file)).isDirectory();
		});
	},

	refreshLibrary : function(){
		var dirs = this.getDirectories();
		films.nbFilms = dirs.length;
		for(var i in dirs){
			this.findData(dirs[i], i);
			console.log("TOUR " + i + "  " + dirs[i]);
			films.list[i] = {"title": dirs[i], "path" : path.join(config.filmsFolder, dirs[i])};
		}
		var filmsList_str = JSON.stringify(films.list);
		fs.writeFileSync(path.join(config.filmsFolder, 'library.json'), filmsList_str, "UTF-8");
	},

	parseDir : function(){
		fs.exists(path.join(config.filmsFolder, 'library.json'), function(exists){
			if (exists) {
				console.log('library.json found (' + path.join(config.filmsFolder, 'library.json') + ')');
				fs.readFile(path.join(config.filmsFolder, 'library.json'), 'utf-8', function(err, data){
					if (err) throw err;
					films.list = JSON.parse(data);
					console.log(films.list);
					console.log('tmp: ' + this.template);
					$('#content-films').html(Mustache.render(films.template, {'films-list' : films.list})).removeAttr('style');
					for(var film in films.list){
						for(var i = 1; i <= Math.round(films.list[film].vote_average / 2); i++){
							$('.overlay .rating').eq(film).append('<i class="fa fa-star"></i>');
						}
						for(i; i <= 5; i++){
							$('.overlay .rating').eq(film).append('<i class="fa fa-star-o"></i>');
						}
						if (films.list[film].hidden) {
							console.log(films.list[film].title + ": hidden");
							$('.film-thumbnail-container').eq(film).remove();
						}
					}
					$.each(films.list, function(i, v){
						if (v.genres !== undefined) {
							$.each(v.genres, function(j, w){
								films.addGenre(w.name);
								// console.log(w.name);
							});
						}
					});
					films.genres.sort();
					console.log(films.genres);
					for(var i = 0; 180 * i <= $(window).width(); i++) {
						$('#content-films').append('<span class="film-thumbnail-container" ></span>');
					}
					/*for(var i in films.list){
						for(var j in films.list[i].genres){
							films.addGenre(films.list[i].genres[j]);
						}
					}*/
				});
			} else {
				this.refreshLibrary();
			}
		});
},

addToList : function(queryTitle, data,Tour) {
	films.compteur++;
	films.list[Tour] = data;
	films.list[Tour].queryTitle = queryTitle;
	films.list[Tour].hidden = false;
	films.list[Tour].dir_path = path.join(config.filmsFolder, queryTitle);
	// $('#content-films').html(Mustache.render(template, {'films-list' : films.list})).removeAttr('style');
	if (films.compteur == films.nbFilms) {
		/*for(var i in films.list){
			for(var j in films.list[i].genres){
				films.addGenre(films.list[i].genres[j]);
			}
		}*/
		var filmsList_str = JSON.stringify(films.list);
		fs.writeFileSync(path.join(config.filmsFolder, 'library.json'), filmsList_str, "UTF-8");
	}
},


findData : function(queryTitle, Tour) {
	tmdb.search('movie', {query: queryTitle, language: 'fr'}, function (err, results) {
		if (results.results[0] === undefined ) {
			results.title = queryTitle;
			results.poster_path = "img/movie-placeholder.png";
			this.addToList(queryTitle, results,Tour);
		} else {
			tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {
				this.addToList(queryTitle, results, Tour);
			});
		}
	});
},

addGenre : function(genre) {
	// console.log(genre);
	var found = 0;
	for(var i in films.genres){
		if (genre == films.genres[i]) {
			found++;
		}
	}
	if (found === 0) {
		films.genres[films.a++] = genre;
	}
}

};
