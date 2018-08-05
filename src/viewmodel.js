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
			if (self.locationList[i].name.toLowerCase().indexOf(self.searchString().toLowerCase()) != -1) {
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
		  	console.log('<img src="' + self.currentLocation().imgSrc() + '"></div>');
		  	self.infoWindow.setContent('<div>' + marker.title +
		 		'</div><br><div><img src="' + self.currentLocation().imgSrc() + '"></div>');
		  	self.infoWindow.open(self.map, marker);
		  	// Ensure the marker property is cleared if the infowindow is closed.
		  	self.infoWindow.addListener('closeclick', function() {
		    	self.infoWindow.marker = null;
		    	marker.stopBounce();
		  	});
		}
	}

	// Sets the current location on the map, and populates the respective info window
	this.selectLocation = function(selectedLocation) {
		self.currentLocation(selectedLocation);
		self.locationsFiltered().forEach(function(location) {
			if (location == selectedLocation)
				location.marker.startBounce();
			else
				location.marker.stopBounce();
		});
		self.populateInfoWindow(selectedLocation.marker);
	};
}

module.exports = new ViewModel();