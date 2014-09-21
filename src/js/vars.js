var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');
var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');
var exec = require('child_process').exec;

// var filmsList = [];
var films = {
	list: []
};
var config = {};
var azerty = "LOLOL";
var playerPath = "C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe";
var filmsFolder = "F:\\Videos\\Films";