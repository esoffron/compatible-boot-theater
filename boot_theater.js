(function () {
	function addLoadListener(fn) {
		if (window.addEventListener) {
			window.addEventListener('load', fn, false);
		} else {
			var prev = window.onload;
			window.onload = function () {
				if (typeof prev === 'function') prev();
				fn();
			};
		}
	}

	function shuffleArray(array) {
		var currentIndex = array.length;
		var temporaryValue;
		var randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function ensureArrayLength(length, value) {
		var array = new Array(length);
		for (var i = 0; i < length; i++) array[i] = value;
		return array;
	}

	function startBootTheater() {
		var config = window.bootTheaterConfig || {};
		var videoUrls = config.videoUrls || window.videoUrls;
		var label = config.label || 'video URLs';
		var muted = !!config.muted;
		var fixedGridUrls = config.fixedGridUrls || {};

		var gridVideos = document.getElementsByTagName('video');
		if (!gridVideos || gridVideos.length < 1) {
			console.error('No <video> elements found');
			return;
		}

		if (!videoUrls || !videoUrls.length) {
			console.error('No video URLs provided (set window.bootTheaterConfig.videoUrls)');
			return;
		}

		videoUrls = shuffleArray(videoUrls.slice(0));
		config.videoUrls = videoUrls;
		window.bootTheaterConfig = config;

		console.log('Loaded ' + videoUrls.length + ' ' + label + (muted ? ' (muted)' : ''));

		var currentlyPlaying = ensureArrayLength(gridVideos.length, null);
		var failedVideos = [];

		function contains(array, value) {
			return array.indexOf(value) !== -1;
		}

		function getUniqueVideoUrl() {
			var availableVideos = [];

			for (var i = 0; i < videoUrls.length; i++) {
				var url = videoUrls[i];
				if (contains(failedVideos, url)) continue;
				if (contains(currentlyPlaying, url)) continue;
				availableVideos.push(url);
			}

			if (availableVideos.length < 1) {
				for (var j = 0; j < videoUrls.length; j++) {
					var url2 = videoUrls[j];
					if (!contains(currentlyPlaying, url2)) availableVideos.push(url2);
				}
			}

			if (availableVideos.length < 1) {
				availableVideos = videoUrls;
			}

			return availableVideos[Math.floor(Math.random() * availableVideos.length)];
		}

		function safePlay(ele) {
			try {
				var p = ele.play();
				if (p && typeof p.catch === 'function') {
					p.catch(function () {
						console.log('Autoplay may require user interaction');
					});
				}
			} catch (e) {
				console.log('Autoplay may require user interaction');
			}
		}

		function playAtIndex(gridIndex, ele) {
			var videoUrl = fixedGridUrls.hasOwnProperty(gridIndex)
				? fixedGridUrls[gridIndex]
				: getUniqueVideoUrl();
			currentlyPlaying[gridIndex] = videoUrl;

			ele.src = videoUrl;
			if (muted) ele.muted = true;
			ele.load();
			safePlay(ele);

			ele.onerror = function () {
				console.error('Failed to load: ' + videoUrl);
				failedVideos.push(videoUrl);
				playAtIndex(gridIndex, ele);
			};

			ele.onended = function () {
				playAtIndex(gridIndex, ele);
			};

			console.log('Grid ' + gridIndex + ' playing' + (muted ? ' (muted)' : '') + ': ' + videoUrl);
		}

		for (var i = 0; i < gridVideos.length; i++) {
			playAtIndex(i, gridVideos[i]);
		}
	}

	addLoadListener(startBootTheater);
})();
