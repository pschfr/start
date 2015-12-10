<?php
	$bg = array('bg1.png', 'bg2.png', 'bg3.png', 'bg4.png', 'bg5.png', 'bg6.png', 'bg7.png', 'bg8.png', 'bg9.png', 'bg10.png', 'bg11.png', 'bg12.png', 'bg13.png', 'bg14.png', 'bg15.png', 'bg16.png', 'bg17.png', 'bg18.png', 'bg19.png', 'bg20.png', 'bg21.png', 'bg22.png');
	$i = rand(0, count($bg)-1);
  	$selectedBg = "$bg[$i]";
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>New Tab</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<style type="text/css">
			body { background: url(/start/trippy/<?php echo $selectedBg; ?>) center 100%; }
		</style>
	</head>
	<body>
		<canvas style="z-index: 9" id="snow"></canvas>
		<div class="wrapper">
			<ul>
				<p class="center">Howdy! In <span class="location">Hell</span>, the weather is <span class="current">null</span>, the temperature is <span class="temp">--</span>&deg;, and the wind is <span class="wind">0mph N</span>.</p>
				<div class="left">
					<li><a id="parent1" class="parent" href="javascript:void(0)">Social Media<span class="right">s</span></a>
						<ul class="subMenu">
							<li><a class="tab1" href="https://facebook.com/">Facebook<span class="right">f</span></a></li>
							<li><a class="tab1" href="https://messenger.com/">Messenger<span class="right">m</span></a></li>
							<li><a class="tab1" href="https://instagram.com/">Instagram<span class="right">i</span></a></li>
							<li><a class="tab1" href="https://tumblr.com/">Tumblr<span class="right">t</span></a></li>
							<li><a class="tab1" href="https://twitter.com/">Twitter<span class="right">w</span></a></li>
							<li><a class="tab1" href="https://mail.google.com/">Gmail<span class="right">g</span></a></li>
						</ul>
					</li>
					<li><a id="parent2" class="parent" href="javascript:void(0)">Music &amp; Videos<span class="right">m</span></a>
						<ul class="subMenu">
							<li><a class="tab2" href="https://youtube.com/">YouTube<span class="right">y</span></a></li>
							<li><a class="tab2" href="https://soundcloud.com/">SoundCloud<span class="right">c</span></a></li>
							<li><a class="tab2" href="https://music.google.com/">Google Play Music<span class="right">g</span></a></li>
							<li><a class="tab2" href="https://play.spotify.com/">Spotify Web Client<span class="right">s</span></a></li>
						</ul>
					</li>
					<li><a id="parent3" class="parent" href="javascript:void(0)">Reddit<span class="right">r</span></a>
						<ul class="subMenu">
							<li><a class="tab3" href="https://reddit.com/">Front Page<span class="right">f</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/trees/">/r/trees<span class="right">t</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/see/">/r/see<span class="right">s</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/blackpeopletwitter/">/r/blackpeopletwitter<span class="right">b</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/showerthoughts/">/r/showerthoughts<span class="right">w</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/unixporn/">/r/unixporn<span class="right">u</span></a></li>
							<li><a class="tab3" href="https://reddit.com/r/startpages/">/r/startpages<span class="right">x</span></a></li>
						</ul>
					</li>
				</div>
				<div class="right">
					<li><a id="parent4" class="parent" href="javascript:void(0)">Research &amp; Dev<span class="right">?</span></a>
						<ul class="subMenu">
							<li><a class="tab4" href="https://stackoverflow.com/">Stack Overflow<span class="right">s</span></a></li>
							<li><a class="tab4" href="https://developer.mozilla.com/">Mozilla Development Network<span class="right">m</span></a></li>
							<li><a class="tab4" href="https://github.com/">Github<span class="right">g</span></a></li>
							<li><a class="tab4" href="https://askubuntu.com/">Ask Ubuntu<span class="right">u</span></a></li>
							<li><a class="tab4" href="https://www.google.com/fonts/">Google Web Fonts<span class="right">f</span></a></li>
							<li><a class="tab4" href="https://unsplash.com/">Unsplash<span class="right">p</span></a></li>
							<li><a class="tab4" href="http://en.wikipedia.org/">Wikipedia<span class="right">w</span></a></li>
							<li><a class="tab4" href="http://wolframalpha.com/">WolframAlpha<span class="right">a</span></a></li>
							<li><a class="tab4" href="https://niice.co/">Niice<span class="right">n</span></a></li>
							<li><a class="tab4" href="https://www.google.com/images/">Google Images<span class="right">i</span></a></li>
						</ul>
					</li>
					<li><a id="parent5" class="parent" href="javascript:void(0)">o2<span class="right">o</span></a>
						<ul class="subMenu">
							<li><a class="tab5" href="http://life.o2dca.com/">Life<span class="right">l</span></a></li>
							<li><a class="tab5" href="http://admin.o2dca.com/">Admin<span class="right">a</span></a></li>
							<li><a class="tab5" href="https://www.toggl.com/app/timer">Toggl<span class="right">t</span></a></li>
							<li><a class="tab5" href="http://bugs.o2dca.com/">Mantis<span class="right">m</span></a></li>
							<li><a class="tab5" href="https://mail.google.com/mail/u/1/#inbox">Gmail<span class="right">g</span></a></li>
						</ul>
					</li>
					<li><a id="parent6" class="parent" href="javascript:void(0)">Comics<span class="right">c</span></a>
						<ul class="subMenu">
							<li><a class="tab6" href="http://xkcd.com/">XKCD<span class="right">x</span></a></li>
							<li><a class="tab6" href="http://explosm.net/">Cyanide and Happiness<span class="right">&</span></a></li>
							<li><a class="tab6" href="http://potshotcomic.com/">Pot Shot Comic<span class="right">p</span></a></li>
							<li><a class="tab6" href="http://powernapcomic.com/">Powernap Comic<span class="right">n</span></a></li>
							<li><a class="tab6" href="http://extrafabulouscomics.com/">Extra Fabulous Comics<span class="right">e</span></a></li>
							<li><a class="tab6" href="http://thedoghousediaries.com/">Doghouse Diaries<span class="right">d</span></a></li>
							<li><a class="tab6" href="http://questionablecontent.net/">Questionable Content<span class="right">q</span></a></li>
							<li><a class="tab6" href="http://smbc-comics.com/">Saturday Morning Breakfast Cereal<span class="right">s</span></a></li>
							<li><a class="tab6" href="http://theoatmeal.com/comics/">The Oatmeal<span class="right">o</span></a></li>
						</ul>
					</li>
				</div>
				<div class="clear"></div>
				<p class="center quote"></p>
			</ul>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery.simpleWeather/3.0.2/jquery.simpleWeather.min.js"></script>
		<script src="mousetrap.min.js"></script>
		<script src="script.js"></script>
	</body>
</html>
