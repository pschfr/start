// Finds current time and date, formats it properly
function startTime() {
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	var dayNames   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var now  = new Date();
	var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
	var date = [now.getDate(), now.getDay(), now.getMonth()];
	var hour = time[0];
	var mins = time[1];
	var secs = time[2];
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var day  = date[0];
	var weekday = dayNames[date[1]];
	var month = monthNames[date[2]];
	hour = hour % 12;
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	document.getElementById('time').innerHTML = hour + ':' + mins + ':' + secs + ' ' + ampm + '<br/>' + weekday + ', ' + month + '. ' + day;
	var t = setTimeout(startTime, 500);
}

// Random quote function. Important: Make sure each quote has a corresponding "quoted".
function randomQuote() {
	$('#quote').unbind('click');
	var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do." ];
	var quoted = [ "Lao Tzu", "Joker", "Friedrich Nietzsche", "Paulo Coelho", "Sir Francis Bacon", "Mads Nipper", "Pablo Picasso", "Dr. Seuss", "Dale Carnegie", "Edwin Land", "Nikola Tesla", "Ralph Marston", "Ayn Rand", "Sam Levenson", "Walt Disney", "Henry Ford" ];
	var randNumQuotes = Math.floor((Math.random() * quotes.length));
	document.getElementById('quote').innerHTML = '&ldquo;' + quotes[randNumQuotes] + '&rdquo;<br />' + '<small>' + quoted[randNumQuotes] + '</small>';
	$('#quote').click(function() { randomQuote(); });
}

// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		success: function(weather) {
			document.getElementById('weather').innerHTML = '<a href="' + weather.link + '" title="' + weather.wind.speed + weather.units.speed + ' ' + weather.wind.direction + '" id="weatherlink">' + weather.temp + '&deg;, ' + weather.currently + '<br/>' + weather.city + ',' + weather.region + '</a>';
		}
	});
}

// Geolocates the user, otherwise defaulting to Pittsburgh (2473224)
function geolocWeather() {
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
	  	}, getWeather(2473224), {timeout: 5000});
	} else { getWeather(2473224); }
}

// Initializes keyboard nav
function bindMousetraps() {
	// Loops through parent cells, opening those on request
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).attr('data-key'), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			// Binds key shortcuts for parent cell children when opened
			$.each($(val).parent().find('.tab'), function(i, val) {
				Mousetrap.bind($(val).attr('data-key'), function(e) {
					// Go to link URL
					window.location.href = $(val).attr('href');
				});
			});
			// Resets key shortcuts when parent cell key pressed twice
			Mousetrap.bind($(val).attr('data-key'), function(e) {
				resetMousetraps();
			});
		});
	});
	// Resets on ESC
	Mousetrap.bind('esc', function(e) {
		resetMousetraps();
	});
	// Binds Weather link
	Mousetrap.bind('w', function(e) {
		window.location.href = document.getElementById('weatherlink');
	});
	// Binds secret GitHub link
	Mousetrap.bind('g', function(e) {
		window.location.href = 'https://github.com/pschfr/start';
	});
}

// Closes cells, rebinds keyboard shortcuts
function resetMousetraps() {
	$('.subMenu').slideUp(150);
	$('li a').removeClass('active');
	Mousetrap.reset();
	bindMousetraps();
}

// Connects to Last.FM, retrives most recent song
function lastFM_request() {
	var username  = 'paul_r_schaefer';
	var API_key   = '0f680404e39c821cac34008cc4d803db';
	var lastFMurl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=' + API_key + '&limit=1&format=json';
	var element   = document.getElementById('lastFM');
	var xmlhttp   = new XMLHttpRequest();
	xmlhttp.open('GET', lastFMurl, true);
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4) {
	        if(xmlhttp.status == 200) {
	            var track = JSON.parse(xmlhttp.responseText).recenttracks.track[0];

				if (track['\@attr'] && track['\@attr'].nowplaying !== '')
					element.innerHTML = 'currently listening to: ';
				else
					element.innerHTML = 'last listened to: ';

				element.innerHTML += '<a href="' + track.url + '" title="on album: ' + track.album['\#text'] + '">' + track.artist['\#text'] + ' &mdash; ' + track.name + '</a> ';
	         }
	    }
	};
	xmlhttp.send(null);
}

// Initializes everything on page load
$(function() {
	startTime();
	randomQuote();
	bindMousetraps();
	geolocWeather();
	lastFM_request();

	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	$('#background').click(function() {
		resetMousetraps();
	});
});
