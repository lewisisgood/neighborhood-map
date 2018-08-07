const ko = require('knockout');
const $ = require('jquery');
const config = require('../config.json');
const imgNotAvailable = require('./constants.js').imgNotAvailable;


/*
* Representes a model for Locations
* Populates the venue images from Foursquare, when the model is called
*/
var Location = function(data) {
	var self = this;
	this.name = data.name;
	this.coordinates = data.coordinates;
	this.foursquare_venue_id = data.foursquare_venue_id;
	this.imgSrc = ko.observable(imgNotAvailable);


	var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + this.foursquare_venue_id + '/photos'

	$.ajax({
		url: foursquareUrl,
		dataType: "json",
		data: config.foursquare,
		timeout: 10000,
		success: function(response) {
			var firstpic = response.response.photos.items[0];
			var prefix = firstpic.prefix;
			var suffix = firstpic.suffix;

			self.imgSrc( prefix + "200x150" + suffix );
			//clearTimeout(foursquareRequestTimeout);
		},
		error: function(request, status, error) {
			if (status == "timeout") {
                window.alert('Foursquare API timeout');
            } else {
                // another error occured
                window.alert("Error: " + request + status + error);
            }
        }
    });
}

module.exports = {
	Location: Location
}