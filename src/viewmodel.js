const models = require('./models.js');
const constants = require('./constants.js');
const ko = require('knockout');
const _ = require('underscore');

var ViewModel = function() {
	var self = this;

	//TODO: hook up to the html
	this.searchString = ko.observable('');

	this.locationList = ko.observableArray([]);

	constants.locations.forEach(function(locationItem){
		self.locationList.push( new models.Location(locationItem) );
	});

	this.currentLocation = ko.observable( this.locationList()[0] );

	this.selectLocation = function(selectedLocation) {
		self.currentLocation(selectedLocation);
	};

	//TODO: add filter functionality to viewmodel
	//If the search string is not found in location.name, set location.hidden to true

	this.locationsFiltered = ko.computed( function() {
		return _.filter(self.locationList(), function(location) { 
			return location.name.indexOf(self.searchString()) != -1; 
		})
	}, this);
}

module.exports = new ViewModel();