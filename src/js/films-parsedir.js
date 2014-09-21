films = {

	compteur : 0,
	nbFilms : 0,
	template : $('#content-films').html(),


	getDirectories : function() {
		return fs.readdirSync(config.filmsFolder).filter(function (file) {
			return fs.statSync(path.join(config.filmsFolder, file)).isDirectory();
		});
	},

	refreshLibrary : function(){
		var dirs = this.getDirectories();
		nbFilm = dirs.length;
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
				});
			} else {
				this.refreshLibrary();
			}
		});
	},

	addToList : function(queryTitle, data,Tour) {
		compteur++;
		films.list[Tour] = data;
		films.list[Tour].queryTitle = queryTitle;
		films.list[Tour].hidden = false;
		films.list[Tour].dir_path = path.join(config.filmsFolder, queryTitle);
		// $('#content-films').html(Mustache.render(template, {'films-list' : films.list})).removeAttr('style');
		if (compteur == nbFilm) {
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
	}

};
