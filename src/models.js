const ko = require('knockout');
const $ = require('jquery');

var Location = function(data) {
	var self = this;
	this.name = data.name;
	this.coordinates = ko.observable(data.coordinates);
	this.foursquare_venue_id = ko.observable(data.foursquare_venue_id);
	this.imgSrc = ko.observable(data.imgSrc);
	this.hidden = ko.observable(data.hidden);
	
	var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + this.foursquare_venue_id() + '/photos?client_id=IHS0HDH55K55KN03E4MRRVTKTYP00UQEGUAG1SAGM4BUTHOI&client_secret=PE5PUPMEZZWKT2PNIOVJEILRESUMW1NMPGWPTSJHCGN2UOR4&v=20180323';
	
	/* Take out foursquare call during dev--exceeding quota

	var foursquareRequestTimeout = setTimeout(function(){
		//TODO Fix this -- image of failed to load
		console.log("failed to get foursquare image");
	    //$imgSrc.text("failed to get foursquare image");
	}, 10000);

	$.ajax({
	    url: foursquareUrl,
	    dataType: "json",
	    success: function( response ) {
	        var firstpic = response.response.photos.items[0];
	        var prefix = firstpic.prefix;
	    	var suffix = firstpic.suffix;

	    	self.imgSrc( prefix + "200x150" + suffix );
	    	console.log(self.imgSrc());
	        clearTimeout(foursquareRequestTimeout);
	    }
	});
	*/
}

module.exports = {
	Location: Location
}