// Finds current time and date, formats it properly
function startTime() {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dayNames   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var now  = new Date();
	var time = [now.getHours(), now.getMinutes(), now.getSeconds()];
	var date = [now.getDate(), now.getDay(), now.getMonth(), now.getFullYear()];
	var hour = time[0];
	var mins = time[1];
	var secs = time[2];
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var day  = date[0];
	var weekday = dayNames[date[1]];
	var month = monthNames[date[2]];
	var year = date[3];
	hour = hour % 12;
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	document.getElementById('time').innerHTML = '<span title="' + weekday + ', ' + month + ' ' + day + ', ' + year + '">' + hour + ':' + mins + ':' + secs + ' ' + ampm + '</span>';
	var t = setTimeout(startTime, 500);
}
// Random quote function. Important: Make sure each quote has a corresponding "quoted".
function randomQuote() {
	document.getElementById('quote').removeEventListener('click', refreshStuff, false);
	var quotes = [ "If you are depressed you are living in the past. If you are anxious you are living in the future. If you are at peace you are living in the present.", "Madness, as you know, is a lot like gravity, all it takes is a little push.", "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.", "Life has many ways of testing a person's will, either by having nothing happen at all or by having everything happen all at once.", "There is no excellent beauty that hath not some strangeness in its proportions.", "Children are fantastic little creatures, because next to drunk people, they are the only truly honest people on earth.", "I begin with an idea, and then it becomes something else.", "Be who you are and say what you feel because those who mind don't matter and those who matter don't mind.", "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get people interested in you.", "An essential aspect of creativity is not being afraid to fail.", "Antisocial behavior is a trait of intelligence in a world of conformists.", "What you do today can improve all your tomorrows.", "A creative man is motivated by the desire to achieve, not by the desire to beat others.", "Don't watch the clock; do what it does. Keep going.", "If you can dream it, you can do it.", "You can't build a reputation on what you're going to do." ];
	var quoted = [ "Lao Tzu", "Joker", "Friedrich Nietzsche", "Paulo Coelho", "Sir Francis Bacon", "Mads Nipper", "Pablo Picasso", "Dr. Seuss", "Dale Carnegie", "Edwin Land", "Nikola Tesla", "Ralph Marston", "Ayn Rand", "Sam Levenson", "Walt Disney", "Henry Ford" ];
	var randNumQuotes = Math.floor((Math.random() * quotes.length));
	document.getElementById('quote').innerHTML = '&ldquo;' + quotes[randNumQuotes] + '&rdquo; &mdash; ' + '<small>' + quoted[randNumQuotes] + '</small>';
	document.getElementById('quote').addEventListener('click', refreshStuff, false);
}
function randomBackground(time, categories) { // daily, weekly, or every time
	// var categories = ['buildings', 'food', 'nature', 'people', 'technology', 'objects'];
	var categories = ['buildings', 'nature', 'objects'];
	var randomCategory = Math.floor((Math.random() * categories.length));
	var photo = new UnsplashPhoto();
	if (time == 'daily' || time == 'weekly')
		photo.all().randomize(time).fromCategory(categories[randomCategory]).fetch();
	else
		photo.all().fromCategory(categories[randomCategory]).fetch();
	document.getElementById('background').style.backgroundImage = "url(" + photo.url + ")";
}
// Loop through the user's first 6 bookmark folders
function fetchBookmarks() {
	var count = 6;
	chrome.bookmarks.getTree(function(itemTree){                // gets list of bookmarks
		itemTree.forEach(function(item){                        // loops through them all
			item.children[0].children.forEach(function(child) { // filters to only bookmarks in the bookmarks bar
				if (child.children && count >= 1) {             // filters to folders on bookmarks bar and limits to 6
					console.log(child.title + ' ' + child.title.charAt(0).toLowerCase()); // get folder title and first letter
					child.children.forEach(function(bookmark) {
						var matches = bookmark.title.match(/\[(.*?)\]/); // fetch character between [] for keyboard shortcut
						if (matches)
							console.log(bookmark.title + ' ' + bookmark.url + ' ' + bookmark.title.match(matches[1]));
					});
					console.log('');
					count--;
				}
			});
		});
	});
	var left = document.createElement('div');
	left.className = 'left';
	document.getElementById('box').appendChild(left);
	var right = document.createElement('div');
	right.className = 'right';
	document.getElementById('box').appendChild(right);
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
	// Binds refresh function
	Mousetrap.bind('space', function(e) {
		refreshStuff();
	});
}
// Closes cells, rebinds keyboard shortcuts
function resetMousetraps() {
	$('.subMenu').slideUp(150);
	$('li a').removeClass('active');
	Mousetrap.reset();
	bindMousetraps();
}
// Gets weather for requested location, appends to page
function getWeather(location) {
	var API_key    = '3dc48ab835ed1b4369c089d0e742ff03';
	var exclusions = 'flags,daily,minutely,alerts';
	var darkSkyURL = 'https://api.darksky.net/forecast/' + API_key + '/' + location + '?exclude=' + exclusions;
	var element    = document.getElementById('weather');
	var xmlhttp    = new XMLHttpRequest();
	xmlhttp.open('GET', darkSkyURL, true);
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4) {
	        if(xmlhttp.status == 200) {
				var weather = JSON.parse(xmlhttp.responseText);
				// console.log(weather);
				element.innerHTML = '<a id="weatherlink" href="https://darksky.net/forecast/' + location + '" title="' + weather.hourly.summary + '">' + weather.currently.summary + ', ' + Math.trunc(weather.currently.temperature) + '&deg;</a>';
	        }
	    }
	};
	xmlhttp.send(null);
}
// Geolocates the user, otherwise defaulting to Pittsburgh
function geolocWeather() {
	if('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
	    	getWeather(position.coords.latitude + ',' + position.coords.longitude);
	  	});
	} else { getWeather('40.4406, -79.9959'); }
}
// Connects to Last.FM, retrives most recent song
function lastfmRequest() {
	var username  = 'paul_r_schaefer';
	var API_key   = '0f680404e39c821cac34008cc4d803db';
	var lastFMurl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=' + API_key + '&limit=1&format=json';
	var element   = document.getElementById('lastFM');
	var xmlhttp   = new XMLHttpRequest();
	xmlhttp.open('GET', lastFMurl, true);
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4) {
	        if(xmlhttp.status == 200) {
				var total = JSON.parse(xmlhttp.responseText).recenttracks['\@attr'].total;
	            var track = JSON.parse(xmlhttp.responseText).recenttracks.track[0];

				if (track['\@attr'] && track['\@attr'].nowplaying !== '')
					element.innerHTML = '<span title="' + total + ' total streamed">currently listening to:</span> ';
				else
					element.innerHTML = '<span title="' + total + ' total streamed">last listened to:</span> ';

				element.innerHTML += '<a href="' + track.url + '" title="on album: ' + track.album['\#text'] + '">' + track.artist['\#text'] + ' &mdash; ' + track.name + '</a> ';
	         }
	    }
	};
	xmlhttp.send(null);
}
function getOptions() {
	chrome.storage.sync.get({
		backgroundCategory: 'category/nature',
		backgroundRefresh:  'daily',
		lastFMusername:     'paul_r_schaefer'
	}, function(items) {
		console.log(items.backgroundCategory);
		console.log(items.backgroundRefresh);
		console.log(items.lastFMusername);
	});
}
function refreshStuff() {
	resetMousetraps();
	randomQuote();
	randomBackground();
	geolocWeather();
	lastfmRequest();
}
// Initializes everything on page load
$(function() {
	startTime();
	randomQuote();
	randomBackground();
	fetchBookmarks();
	bindMousetraps();
	geolocWeather();
	lastfmRequest();
	getOptions();

	// generate snow with canvas
	// var a=document.getElementById("snow"),d=a.getContext("2d"),e=[],f=Math;a.style.pointerEvents="none";a.style.position="fixed";a.style.width="100vw";a.style.height="100vh";a.height=a.offsetHeight;a.width=a.offsetWidth;window.onresize=function(){a.height=a.offsetHeight;a.width=a.offsetWidth}; setInterval(function(){d.clearRect(0,0,a.width,a.height);d.beginPath();if(.3<f.random()){var b=f.random(),g=.05+.95*b,c={};c.x=1.5*a.width*f.random()-.5*a.width;c.y=-9;c.c=2*g*(f.random()/2+.5);c.d=5*g;c.a=5*b;c.b=function(){var t=this;t.x+=t.c;t.y+=t.d;d.beginPath();d.arc(t.x,t.y,t.a,0,2*f.PI,!1);d.fillStyle="#FFF";d.fill()};e.push(c)}for(b=0;b<e.length;b++)e[b].y>a.height?e.splice(b,1):e[b].b()},16);

	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	document.getElementById('background').addEventListener('click', resetMousetraps, false);
});
