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

	var foursquareRequestTimeout = setTimeout(function(){
		//TODO Fix this -- image of failed to load
		console.log("failed to get foursquare image");
		//$imgSrc.text("failed to get foursquare image");
	}, 10000);

	$.ajax({
		url: foursquareUrl,
		dataType: "json",
		data: config.foursquare,
		success: function( response ) {
			var firstpic = response.response.photos.items[0];
			var prefix = firstpic.prefix;
			var suffix = firstpic.suffix;

			self.imgSrc( prefix + "200x150" + suffix );
			console.log(self.imgSrc());
			clearTimeout(foursquareRequestTimeout);
		}
	});
}

module.exports = {
	Location: Location
}