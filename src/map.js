const locations = require('./constants.js').locations;

// Create a map variable
var map;
var markers = [];

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
	//console.log(marker);
	//console.log(infowindow);
	//var imgSrc = locations[marker.id].imgSrc;
	// Check to make sure the infowindow is not already opened on this marker.
	if (infowindow.marker != marker) {
	  	infowindow.marker = marker;
	  	// TODO: Add picture from Foursquare to the map
	  	infowindow.setContent('<div>' + marker.title +
	 		'<br><img src="https://www.ereplacementparts.com/images/photo_not_available.png"></div>');
	  	infowindow.open(map, marker);
	  	// Make sure the marker property is cleared if the infowindow is closed.
	  	infowindow.addListener('closeclick', function() {
	    	infowindow.marker = null;
	  	});
	}
}

//TODO: separate into just view ?
function initMap(googleMaps) {

	console.log("initMap called");
	map = new googleMaps.Map(document.getElementById('map'), {
		center: {lat: 30.2491225, lng: -97.7815471},
		zoom: 13
	});

	var largeInfowindow = new googleMaps.InfoWindow();

	// The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
	    var position = locations[i].coordinates;
	    var title = locations[i].name;
	    //TODO: add an image to the markers info window
	    //var imgSrc = ko.observable(locations[i].imgSrc);
	    // Create a marker per location, and put into markers array.
	    var marker = new googleMaps.Marker({
	    	position: position,
	    	title: title,
	    	animation: googleMaps.Animation.DROP,
	    	id: i,
	    	map: map
	    });
	    // Push the marker to our array of markers.
	    markers.push(marker);
	    // Create an onclick event to open an infowindow at each marker.
	    marker.addListener('click', function() {
	    	populateInfoWindow(this, largeInfowindow);
	  });
    }
}

module.exports = {
	map: map,
	markers: markers,
	init: initMap
}