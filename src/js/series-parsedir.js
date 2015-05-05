series = {

	compteur : 0,
	nbSeries : 0,
	template : $('#content-series').html(),
	a : 0,
	genres : [],


	getDirectories : function() {
		return fs.readdirSync(config.seriesFolder).filter(function (file) {
			return fs.statSync(path.join(config.seriesFolder, file)).isDirectory();
		});
	},

	refreshLibrary : function(){
		var dirs = this.getDirectories();
		console.log("dirs:");
		console.log(dirs);
		series.nbSeries = dirs.length;
		for(var i in dirs){
			this.findData(dirs[i], i);
			console.log("TOUR " + i + "  " + dirs[i]);
			series.list[i] = {"title": dirs[i], "path" : path.join(config.seriesFolder, dirs[i])};
		}
		var seriesList_str = JSON.stringify(series.list);
		fs.writeFileSync(path.join(config.seriesFolder, 'library.json'), seriesList_str, "UTF-8");
	},

	parseDir : function(){
		fs.exists(path.join(config.seriesFolder, 'library.json'), function(exists){
			if (exists) {
				console.log('library.json found (' + path.join(config.seriesFolder, 'library.json') + ')');
				fs.readFile(path.join(config.seriesFolder, 'library.json'), 'utf-8', function(err, data){
					if (err) throw err;
					series.list = JSON.parse(data);
					console.log(series.list);
					console.log('tmp: ' + this.template);
					$('#content-series').html(Mustache.render(series.template, {'series-list' : series.list})).removeAttr('style');
					for(var show in series.list){
						for(var i = 1; i <= Math.round(series.list[show].vote_average / 2); i++){
							$('.overlay .rating').eq(show).append('<i class="fa fa-star"></i>');
						}
						for(i; i <= 5; i++){
							$('.overlay .rating').eq(show).append('<i class="fa fa-star-o"></i>');
						}
						if (series.list[show].hidden) {
							console.log(series.list[show].title + ": hidden");
							$('.show-thumbnail-container').eq(show).remove();
						}
					}
					$.each(series.list, function(i, v){
						if (v.genres !== undefined) {
							$.each(v.genres, function(j, w){
								series.addGenre(w.name);
								// console.log(w.name);
							});
						}
					});
					series.genres.sort();
					console.log(series.genres);
					/*for(var i in series.list){
						for(var j in series.list[i].genres){
							series.addGenre(series.list[i].genres[j]);
						}
					}*/
				});
			} else {
				this.refreshLibrary();
			}
		});
},

addToList : function(queryTitle, data,Tour) {
	series.compteur++;
	series.list[Tour] = data;
	series.list[Tour].queryTitle = queryTitle;
	series.list[Tour].hidden = false;
	series.list[Tour].dir_path = path.join(config.seriesFolder, queryTitle);
	// $('#content-series').html(Mustache.render(template, {'series-list' : series.list})).removeAttr('style');
	if (series.compteur == series.nbSeries) {
		/*for(var i in series.list){
			for(var j in series.list[i].genres){
				series.addGenre(series.list[i].genres[j]);
			}
		}*/
		var seriesList_str = JSON.stringify(series.list);
		fs.writeFileSync(path.join(config.seriesFolder, 'library.json'), seriesList_str, "UTF-8");
	}
},


findData : function(queryTitle, Tour) {
	tmdb.search('tv', {query: queryTitle, language: 'fr'}, function (err, results) {
		if (results.results[0] === undefined ) {
			results.title = queryTitle;
			results.poster_path = "img/tv-placeholder.png";
			this.addToList(queryTitle, results,Tour);
		} else {
			tmdb.infos('tv', results.results[0].id, {language: 'fr'}, function (err, results) {
				console.log("res: ");
				console.log(results);
				console.log("err: " + err);
				//this.addToList(queryTitle, results, Tour);
			});
		}
	});
},

addGenre : function(genre) {
	// console.log(genre);
	var found = 0;
	for(var i in series.genres){
		if (genre == series.genres[i]) {
			found++;
		}
	}
	if (found === 0) {
		series.genres[series.a++] = genre;
	}
}

};
