const models = require('./models.js');
const constants = require('./constants.js');
const ko = require('knockout');

var ViewModel = function() {
	var self = this;

	this.searchString = ko.observable('');

	this.locationList = [];

	constants.locations.forEach(function(locationItem){
		self.locationList.push( new models.Location(locationItem) );
	});

	this.currentLocation = ko.observable( this.locationList[0] );

	// Currently not being used
	this.selectLocation = function(selectedLocation) {
		self.currentLocation(selectedLocation);
	};

	var showMarker = function(location) {
		if (location.hasOwnProperty('marker') && self.hasOwnProperty('map')) {
			location.marker.setMap(self.map);
		}
	}

	var hideMarker = function(location) {
		if (location.hasOwnProperty('marker'))
			location.marker.setMap(null);
	}
	
	// If the search string is not found in location.name, set location.hidden to true
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

}

module.exports = new ViewModel();