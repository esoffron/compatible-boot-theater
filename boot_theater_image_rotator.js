(function () {
	function addLoadListener(fn) {
		if (window.addEventListener) {
			window.addEventListener('load', fn, false);
		} else {
			var prev = window.onload;
			window.onload = function () {
				if (typeof prev === 'function') {
					prev();
				}
				fn();
			};
		}
	}

	function startImageTheater() {
		var config = window.bootTheaterConfig || {};
		var gridImages = document.querySelectorAll('#grid img');
		var imageFiles = config.imageFiles || [];
		var totalImages = config.totalImages || 0;
		var fadeDurationMs = config.fadeDurationMs || 800;
		var preloadTimeoutMs = config.preloadTimeoutMs || 10000;
		var reloadMinDelayMs = config.reloadMinDelayMs || 5000;
		var reloadMaxDelayMs = config.reloadMaxDelayMs || 15000;
		var logLabel = config.logLabel || 'images';

		if (!gridImages || gridImages.length < 1) {
			console.error('No <img> elements found in grid');
			return;
		}

		if (!imageFiles.length && totalImages < 1) {
			console.error('No image files configured');
			return;
		}

		console.log('Loaded ' + (imageFiles.length || totalImages) + ' ' + logLabel);

		var currentSelections = [];
		var pendingSelections = [];

		function getRandomSelection() {
			if (imageFiles.length) {
				return Math.floor(Math.random() * imageFiles.length);
			}

			return Math.floor(Math.random() * totalImages) + 1;
		}

		function getUniqueSelection() {
			var availableSelections = [];
			var i;

			if (imageFiles.length) {
				for (i = 0; i < imageFiles.length; i++) {
					if (currentSelections.indexOf(i) === -1 && pendingSelections.indexOf(i) === -1) {
						availableSelections.push(i);
					}
				}
			} else {
				for (i = 1; i <= totalImages; i++) {
					if (currentSelections.indexOf(i) === -1 && pendingSelections.indexOf(i) === -1) {
						availableSelections.push(i);
					}
				}
			}

			if (!availableSelections.length) {
				return getRandomSelection();
			}

			return availableSelections[Math.floor(Math.random() * availableSelections.length)];
		}

		function getImagePath(selection) {
			if (typeof config.getImagePath === 'function') {
				return config.getImagePath.call(config, selection);
			}

			return config.imageBasePath + encodeURIComponent(imageFiles[selection]);
		}

		function completeSwap(img, imagePath, selection, index, isInitialLoad, onDone) {
			pendingSelections[index] = null;
			currentSelections[index] = selection;

			if (isInitialLoad) {
				img.src = imagePath;
				console.log('Grid ' + index + ' loading: ' + imagePath);
				if (typeof onDone === 'function') {
					onDone();
				}
				return;
			}

			img.classList.add('fade-out');

			setTimeout(function () {
				img.src = imagePath;
				console.log('Grid ' + index + ' loading: ' + imagePath);
				img.offsetHeight;
				img.classList.remove('fade-out');
				if (typeof onDone === 'function') {
					onDone();
				}
			}, fadeDurationMs);
		}

		function preloadImage(img, index, isInitialLoad, onDone) {
			var selection = getUniqueSelection();
			var imagePath = getImagePath(selection);
			var preloader = new Image();
			var completed = false;
			var timeoutId;

			pendingSelections[index] = selection;

			function finish(success, reason) {
				if (completed) {
					return;
				}

				completed = true;
				clearTimeout(timeoutId);
				preloader.onload = null;
				preloader.onerror = null;

				if (!success) {
					pendingSelections[index] = null;
					console.warn(reason + ': ' + imagePath);
					if (typeof onDone === 'function') {
						onDone();
					}
					return;
				}

				completeSwap(img, imagePath, selection, index, isInitialLoad, onDone);
			}

			timeoutId = setTimeout(function () {
				finish(false, 'Timed out preloading image for grid ' + index);
			}, preloadTimeoutMs);

			preloader.onload = function () {
				finish(true);
			};

			preloader.onerror = function () {
				finish(false, 'Failed to preload image for grid ' + index);
			};

			preloader.src = imagePath;
		}

		function scheduleReload(img, index) {
			var randomDelay = reloadMinDelayMs + Math.floor(Math.random() * (reloadMaxDelayMs - reloadMinDelayMs));
			console.log('Grid ' + index + ' will reload in ' + (randomDelay / 1000) + ' seconds');

			setTimeout(function () {
				console.log('Grid ' + index + ' reloading now');
				preloadImage(img, index, false, function () {
					scheduleReload(img, index);
				});
			}, randomDelay);
		}

		for (var i = 0; i < gridImages.length; i++) {
			(function (img, index) {
				preloadImage(img, index, true, function () {
					scheduleReload(img, index);
				});
			})(gridImages[i], i);
		}
	}

	addLoadListener(startImageTheater);
})();
