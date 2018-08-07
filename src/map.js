const viewmodel = require('./viewmodel.js');

// Create a map variable
var map;
var markers = [];

/*
* Initializes a map using the Google Maps API, including markers for locations with listeners
*/
function initMap(googleMaps) {
	map = new googleMaps.Map(document.getElementById('map'), {
		center: {lat: 30.2491225, lng: -97.7815471},
		zoom: 13
	});

	var largeInfoWindow = new googleMaps.InfoWindow();

	// The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < viewmodel.locationList.length; i++) {
		// Get the position from the location array.
		var position = viewmodel.locationList[i].coordinates;
		var title = viewmodel.locationList[i].name;
		// Create a marker per location, and put into markers array.
		var marker = new googleMaps.Marker({
			position: position,
			title: title,
			animation: googleMaps.Animation.DROP,
			id: i,
			map: map,
			hidden: true
		});

		viewmodel.locationList[i].marker = marker;
		marker.location = viewmodel.locationList[i];

		// Make the marker bounce when selected
		marker.startBounce = function () {
			this.setAnimation(googleMaps.Animation.BOUNCE);
			var self = this;
			setTimeout(function () {
				self.setAnimation(null);
			}, 700);
		};

		// Create an onclick event to open an infowindow at each marker.
		marker.addListener('click', function() {
			viewmodel.selectLocation(this.location);
		});

		// Push the marker to our array of markers.
		markers.push(marker);
	}

	viewmodel.map = map;
	viewmodel.infoWindow = largeInfoWindow;
}

module.exports = {
	init: initMap
}