const models = require('./models.js');
const constants = require('./constants.js');
const ko = require('knockout');


/*
* Updates the Location model based on user actions in the app
* Handles the search string functionality, as well as populating the
* selected location marker's info window
*/
var ViewModel = function() {
	var self = this;

	this.searchString = ko.observable('');

	this.locationList = [];

	constants.locations.forEach(function(locationItem){
		self.locationList.push( new models.Location(locationItem) );
	});

	this.currentLocation = ko.observable( this.locationList[0] );

	var showMarker = function(location) {
		if (location.hasOwnProperty('marker') && self.hasOwnProperty('map')) {
			location.marker.setMap(self.map);
		}
	}

	var hideMarker = function(location) {
		if (location.hasOwnProperty('marker'))
			location.marker.setMap(null);
	}

	// If the search string is not found in location.name, hides the marker on the map
	this.locationsFiltered = ko.computed( function() {

		var filtered = [];

		for (var i = 0; i < self.locationList.length; i++) {
			var nameLower = self.locationList[i].name.toLowerCase();
			var searchStringLower = self.searchString().toLowerCase();
			if (nameLower.indexOf(searchStringLower) != -1) {
				filtered.push( self.locationList[i] );
				showMarker(self.locationList[i]);
			}
			else {
				hideMarker(self.locationList[i]);
			}
		}
		return filtered;
	}, this);

	// Populates the infowindow when the marker is clicked. Only allows
	// one infowindow which will open at the marker that is clicked, and populate based
	// on that markers position.
	this.populateInfoWindow = function(marker) {
		// Check to make sure the infowindow is not already opened on this marker.
		if (self.infoWindow.marker != marker) {
		  	self.infoWindow.marker = marker;
		  	self.infoWindow.setContent('<div><strong>' + marker.title +
		 		'</strong></div><br><div>Photo from Foursquare:<br><a href="https://www.foursquare.com/v/' + self.currentLocation().foursquare_venue_id + '" target="_blank"><img src="' + self.currentLocation().imgSrc() + '"></a></div>');
		  	self.infoWindow.open(self.map, marker);
		  	// Ensure the marker property is cleared if the infowindow is closed.
		  	self.infoWindow.addListener('closeclick', function() {
		    	self.infoWindow.marker = null;
		  	});
		}
	}

	// Sets the current location on the map, and populates the respective info window
	this.selectLocation = function(selectedLocation) {
		self.currentLocation(selectedLocation);
		selectedLocation.marker.startBounce();
		self.populateInfoWindow(selectedLocation.marker);
	};
}

module.exports = new ViewModel();