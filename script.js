var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do." ];
var quoted = [ "Batman", "Joker", "Superman", "Ironman", "Spiderman", "Thor", "Wonder Woman", "Captain America", "Harry Potter", "Deadpool", "Palash Oswal", "Teemo", "Hulk", "Professor Xavier", "Walt Disney", "Science Fact" ];
var greets = [ 'Hello', 'Howdy', 'Yo', 'Sup', 'Wazzup', 'Salutations', 'Hey', 'Hi', 'Greetings', 'Aloha', 'Namaste', 'Hiya', 'Yello', 'Holla', 'Peace' ];
// Important: keep the number of greets, quotes, and backgrounds the same
var TOTAL_PRESETS = greets.length;
// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		success: function(weather) {
			$('.weather').html('In ' + weather.city + ', ' + weather.region + ', the weather is ' + weather.currently + ',<br>the temperature is ' + weather.temp + '&deg;, and the wind is ' + weather.wind.speed + weather.units.speed + ' ' + weather.wind.direction);
		},
		error: function(error)   {
			$('.weather').html('Sorry, there has been a problem retrieving the weather information.');
		}
	});
}
// Master refresh function; appends random greeting, quote, and background
function refreshStuffs() {
	var randNum = Math.floor((Math.random() * TOTAL_PRESETS));
	$('.greeting').html(greets[randNum]);
	$('.quote').html('<p>&ldquo;' + quotes[randNum] + '&rdquo;</p>' + '<cite><p><small>' + quoted[randNum] + '</small></p></cite>');
	$('body').attr('class', function(i, c) {
		return c.replace(/(^|\s)bg\S+/g, '');
	}).addClass('bg' + (randNum + 1));

	// Geolocates the user, otherwise defaulting to Mumbai (2295411)
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
	  	});
	} else { getWeather(2295411); }
}
// Initializes main keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);

			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					if($(val).parent().attr('target')=="_blank"){
					window.open($(val).parent().attr('href'));
					}
					else{
					window.location.href=$(val).parent().attr('href');
					}
				});
			});

			Mousetrap.bind($(val).children('span').text(), function(e) {
				$('.subMenu').slideUp(150);
				$('li a').removeClass('active');
				Mousetrap.reset();
				bindMousetraps();
			});
		});
	});
	// Esc to close all tabs
	Mousetrap.bind('esc', function(e) {
		var randNum = Math.floor((Math.random() * TOTAL_PRESETS));
		$('body').attr('class', function(i, c) {
			return c.replace(/(^|\s)bg\S+/g, '');
		}).addClass('bg' + (randNum + 1));
		$('.subMenu').slideUp(150);
		$('li a').removeClass('active');
		Mousetrap.reset();
		bindMousetraps();
		return false;
	});
	// Refreshes everything, and closes all cells
	Mousetrap.bind('space', function(e){
		$('.subMenu').slideUp(150);
		$('li a').removeClass('active');
		refreshStuffs();
		return false;
	});
}
// Does everything on page load, sets it to auto-refresh every 30s
$(function() {
	$('li a.parent').click(function(){
		$(this).parent('li').find('ul').slideToggle(175);
		$(this).toggleClass('active');
	});
	refreshStuffs();
	bindMousetraps();
	setInterval(function(){ refreshStuffs(); }, 30000);
});
