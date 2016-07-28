var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do." ];
var quoted = [ "Lao Tzu", "Joker", "Friedrich Nietzsche", "Paulo Coelho", "Sir Francis Bacon", "Mads Nipper", "Pablo Picasso", "Dr. Seuss", "Dale Carnegie", "Edwin Land", "Nikola Tesla", "Ralph Marston", "Ayn Rand", "Sam Levenson", "Walt Disney", "Henry Ford" ];
var greets = [ 'Hello', 'Howdy', 'Yo', 'Sup', 'Wazzup', 'Salutations', 'Hey', 'Hi', 'Greetings', 'Aloha', 'Namaste', 'Hiya', 'Yello', 'Holla', 'Peace' ];
var TOTAL_PRESETS = greets.length; // NOTE: keep the number of greetings and quotes the same
// Finds current time and date
function startTime() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var now = new Date();
	var hour = now.getHours();
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	var day = now.getDate();
	var month = monthNames[now.getMonth()];
	var year = now.getFullYear();
	hour = getNonMilitary(hour);
	mins = leadingZero(mins);
	secs = leadingZero(secs);
	var timeString = hour + ':' + mins + ':' + secs;
	var dateString = month + ' ' + day + ', ' + year;
	document.getElementById('time').innerHTML = timeString;
	document.getElementById('date').innerHTML = dateString;
	var t = setTimeout(startTime, 500);
}
function leadingZero(i) {
	if (i < 10)
		i = '0' + i;
	return i;
}
function getNonMilitary(i) {
	if (i > 12)
		i = i - 12;
	else if (i === 0)
		i = 12;
	return i;
}
// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		success: function(weather) {
			$('.weather').html('In ' + weather.city + ', ' + weather.region + ', the weather is ' + weather.currently + ', the temperature is ' + weather.temp + '&deg;, and the wind is ' + weather.wind.speed + weather.units.speed + ' ' + weather.wind.direction);
			$('.weatherlink').html('<a href="' + weather.link + '">More details (w)</a>');
		},
		error: function(error)   {
			$('.weatherlink').html('Sorry, there has been a problem retrieving the weather information.');
		}
	});
}
// Master loading function; appends random greeting, quote, and weather
function loadStuff() {
	var randNum = Math.floor((Math.random() * TOTAL_PRESETS));
	$('.greeting').html(greets[randNum]);
	$('.quote').html('&ldquo;' + quotes[randNum] + '&rdquo; &mdash; ' + '<cite><small>' + quoted[randNum] + '</small></cite>');
	// Geolocates the user, otherwise defaulting to Pittsburgh (2473224)
	console.log('right before geolocation');
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
			console.log('geolocation successful');
	  	}, geolocationFailure(), {timeout: 5000});
	} else { geolocationFailure(); }

	function geolocationFailure() {
		getWeather(2473224);
		console.log('geolocation not successful');
	}
}
// Initializes main keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href = $(val).parent().attr('href');
				});
			});
			Mousetrap.bind($(val).children('span').text(), function(e) {
				$('.subMenu').slideUp(150);
				$('li a').removeClass('active');
				Mousetrap.reset();
				bindMousetraps();
				return false;
			});
		});
	});
	// Esc to close all tabs
	Mousetrap.bind('esc', function(e) {
		var randNum = Math.floor((Math.random() * TOTAL_PRESETS));
		$('.subMenu').slideUp(150);
		$('li a').removeClass('active');
		Mousetrap.reset();
		bindMousetraps();
		return false;
	});
	// Closes all cells and reloads stuff
	Mousetrap.bind('space', function(e) {
		$('.subMenu').slideUp(150);
		$('li a').removeClass('active');
		loadStuff();
		return false;
	});
	// Binds weather detail and GitHub links
	Mousetrap.bind('w', function(e) {
		window.location.href = $('.weatherlink').children().attr('href');
	});
	Mousetrap.bind('g', function(e) {
		window.location.href = $('.github').children().attr('href');
	});
}
// Does everything on page load
$(function() {
	startTime();
	loadStuff();
	bindMousetraps();
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
});
