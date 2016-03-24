// Loads in the Inconsolata font from Google
WebFont.load( {
	google: { families: [ 'Inconsolata' ] },
	active: function (){ console.log('Inconsolata loaded'); }
} );

// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		success: function(weather) { $('.weather').html('In ' + weather.city + ', ' + weather.region + ', the weather is ' + weather.currently + ', the temperature is ' + weather.temp + '&deg;, and the wind is ' + weather.wind.speed + weather.units.speed + ' ' + weather.wind.direction); },
		error: function(error) { $('.weather').html(error); }
	});
}

// TODO: Rewrite to pull from JSON file, that way I don't have to dupicate links in the HTML
var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do." ];
var quoted = [ "Lao Tzu", "Joker", "Friedrich Nietzsche", "Paulo Coelho", "Sir Francis Bacon", "Mads Nipper", "Pablo Picasso", "Dr. Seuss", "Dale Carnegie", "Edwin Land", "Nikola Tesla", "Ralph Marston", "Ayn Rand", "Sam Levenson", "Walt Disney", "Henry Ford" ];
var links  = [ 'https://facebook.com/', 'https://messenger.com/', 'https://instagram.com/', 'https://tumblr.com/', 'https://twitter.com/', 'https://mail.google.com/','https://youtube.com/','https://soundcloud.com/','https://music.google.com/','https://play.spotify.com/','https://reddit.com/','https://reddit.com/r/trees/','https://reddit.com/r/see/','https://reddit.com/r/blackpeopletwitter/','https://reddit.com/r/showerthoughts/','https://reddit.com/r/unixporn/','https://reddit.com/r/startpages/','https://imgur.com/','https://gfycat.com/','https://pastebin.com/','https://stackoverflow.com/','https://developer.mozilla.com/', 'https://github.com/', 'https://www.google.com/fonts/', 'https://unsplash.com/', 'http://en.wikipedia.org/', 'http://wolframalpha.com/', 'https://niice.co/', 'https://www.google.com/images/', 'http://caniuse.com/', 'http://life.o2dca.com/', 'http://admin.o2dca.com/', 'https://www.toggl.com/app/timer', 'http://bugs.o2dca.com/', 'https://mail.google.com/mail/u/1/#inbox', 'http://xkcd.com/', 'http://explosm.net/', 'http://potshotcomic.com/', 'http://powernapcomic.com/', 'http://extrafabulouscomics.com/', 'http://thedoghousediaries.com/', 'http://questionablecontent.net/', 'http://smbc-comics.com/', 'http://theoatmeal.com/comics/' ];
var greets = [ 'Hello', 'Howdy', 'Yo', 'Sup', 'Wazzup', 'Salutations', 'Hey', 'Hi', 'Greetings', 'Aloha', 'Namaste', 'Hiya', 'Yello', 'Holla', 'Peace' ];

// Master refresh function
function refreshStuffs() {
	// Picks random number, appends random greeting, quote, and background
	var randNum = Math.floor((Math.random()*15));
	$('.greeting').html(greets[Math.floor((Math.random()*15))]);
	$('.quote').html("<p>&ldquo;" + quotes[randNum] + "&rdquo;</p>" + "<cite><p><small>" + quoted[randNum] + "</small></p></cite>");
	$('body').attr('class',
    	function(i, c){
    		return c.replace(/(^|\s)bg\S+/g, '');
		}).addClass('bg' + (Math.floor((Math.random()*15)) + 1));
	console.log('refreshed, woo!');

	// Geolocates the user, otherwise defaulting to Pittsburgh
	// TODO: I'm not too sure the fallback works? The geolocation definitely does
	if("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude+','+position.coords.longitude);
	  	});
	} else { getWeather(2473224); }
}

// Esc to close all tabs, leave secret mode
Mousetrap.bind('esc', function(e) {
	$('body').removeClass('rnbw').addClass('bg' + (Math.floor((Math.random()*15)) + 1));
	$('.subMenu').slideUp('fast');
	$('li a').removeClass('active');
	console.log('you escaped!');
	return false;
});

// Rest of the my bookmarks, perhaps I should rewrite how all this works
// TODO: Shift modifier to open in new background tab w/o closing cell
Mousetrap.bind('s', function(e) {
	$('a#parent1').next().slideToggle('fast');
	$('a#parent1').toggleClass('active');
	Mousetrap.bind('f', function(e) { window.location.href = links[0]; });
	Mousetrap.bind('m', function(e) { window.location.href = links[1]; });
	Mousetrap.bind('i', function(e) { window.location.href = links[2]; });
	Mousetrap.bind('t', function(e) { window.location.href = links[3]; });
	Mousetrap.bind('w', function(e) { window.location.href = links[4]; });
	Mousetrap.bind('g', function(e) { window.location.href = links[5]; });
	return false;
});
Mousetrap.bind('m', function(e) {
	$('a#parent2').next().slideToggle('fast');
	$('a#parent2').toggleClass('active');
	Mousetrap.bind('y', function(e) { window.location.href = links[6]; });
	Mousetrap.bind('c', function(e) { window.location.href = links[7]; });
	Mousetrap.bind('g', function(e) { window.location.href = links[8]; });
	Mousetrap.bind('s', function(e) { window.location.href = links[9]; });
	return false;
});
Mousetrap.bind('r', function(e) {
	$('a#parent3').next().slideToggle('fast');
	$('a#parent3').toggleClass('active');
	Mousetrap.bind('f', function(e) { window.location.href = links[10]; });
	Mousetrap.bind('t', function(e) { window.location.href = links[11]; });
	Mousetrap.bind('s', function(e) { window.location.href = links[12]; });
	Mousetrap.bind('b', function(e) { window.location.href = links[13]; });
	Mousetrap.bind('w', function(e) { window.location.href = links[14]; });
	Mousetrap.bind('u', function(e) { window.location.href = links[15]; });
	Mousetrap.bind('x', function(e) { window.location.href = links[16]; });
	Mousetrap.bind('i', function(e) { window.location.href = links[17]; });
	Mousetrap.bind('g', function(e) { window.location.href = links[18]; });
	Mousetrap.bind('p', function(e) { window.location.href = links[19]; });
	return false;
});
Mousetrap.bind('?', function(e) {
	$('a#parent4').next().slideToggle('fast');
	$('a#parent4').toggleClass('active');
	Mousetrap.bind('s', function(e) { window.location.href = links[20]; });
	Mousetrap.bind('m', function(e) { window.location.href = links[21]; });
	Mousetrap.bind('g', function(e) { window.location.href = links[22]; });
	Mousetrap.bind('f', function(e) { window.location.href = links[23]; });
	Mousetrap.bind('p', function(e) { window.location.href = links[24]; });
	Mousetrap.bind('w', function(e) { window.location.href = links[25]; });
	Mousetrap.bind('a', function(e) { window.location.href = links[26]; });
	Mousetrap.bind('n', function(e) { window.location.href = links[27]; });
	Mousetrap.bind('i', function(e) { window.location.href = links[28]; });
	Mousetrap.bind('c', function(e) { window.location.href = links[29]; });
	return false;
});
Mousetrap.bind('o', function(e) {
	$('a#parent5').next().slideToggle('fast');
	$('a#parent5').toggleClass('active');
	Mousetrap.bind('l', function(e) { window.location.href = links[30]; });
	Mousetrap.bind('a', function(e) { window.location.href = links[31]; });
	Mousetrap.bind('t', function(e) { window.location.href = links[32]; });
	Mousetrap.bind('m', function(e) { window.location.href = links[33]; });
	Mousetrap.bind('g', function(e) { window.location.href = links[34]; });
	return false;
});
Mousetrap.bind('c', function(e) {
	$('a#parent6').next().slideToggle('fast');
	$('a#parent6').toggleClass('active');
	Mousetrap.bind('x', function(e) { window.location.href = links[35]; });
	Mousetrap.bind('&', function(e) { window.location.href = links[36]; });
	Mousetrap.bind('p', function(e) { window.location.href = links[37]; });
	Mousetrap.bind('n', function(e) { window.location.href = links[38]; });
	Mousetrap.bind('e', function(e) { window.location.href = links[39]; });
	Mousetrap.bind('d', function(e) { window.location.href = links[40]; });
	Mousetrap.bind('q', function(e) { window.location.href = links[41]; });
	Mousetrap.bind('s', function(e) { window.location.href = links[42]; });
	Mousetrap.bind('o', function(e) { window.location.href = links[43]; });
	return false;
});

// Refreshes everything, and closes all cells
Mousetrap.bind('space', function(e){
	$('.subMenu').slideUp('fast');
	$('li a').removeClass('active');
	refreshStuffs();
	return false;
});

// SECRET PARTY MODE!!1! :D
Mousetrap.bind('up up down down left right left right b a enter', function() {
	$('body').attr('class',
    	function(i, c){
    		return c.replace(/(^|\s)bg\S+/g, '');
		}).addClass('rnbw');
});

// Does everything on page load, sets it to auto-refresh every 30s
$(function() {
	refreshStuffs();
	$("ul.subMenu").hide();
	$("li:has(ul)").click(function(){
		$("ul",this).slideToggle('fast');
		$("a.parent", this).toggleClass('active');
	});
	setInterval(function(){ refreshStuffs(); }, 30000);
});
