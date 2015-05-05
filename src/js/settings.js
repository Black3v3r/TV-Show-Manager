/*function chooseFilmFolder(name) {
	var chooser = $(name);
	chooser.change(function(evt) {
		console.log($(this).val());
	});

	chooser.trigger('click');
}
chooseFilmFolder('#filmsFolderDialog');*/

$('#filmsFolderDialog').change(function(event) {
	console.log($(this).val());
	config.filmsFolder = $(this).val();
	films.parseDir();
	saveSettigns();
});

$('#seriesFolderDialog').change(function(event) {
	console.log($(this).val());
	config.seriesFolder = $(this).val();
	series.parseDir();
	saveSettigns();
});

function saveSettigns(){
	fs.writeFileSync(path.join(execPath, 'config','config.json'), JSON.stringify(config), 'utf-8');
}