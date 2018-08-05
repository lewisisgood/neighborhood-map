// Create hardcoded locations list
var locations = [
	{
		name: 'Zilker Park',
		coordinates: {lat: 30.2669624, lng: -97.775048},
		foursquare_venue_id: '453c8566f964a520123c1fe3'
	},
	{
		name: 'Arlos',
		coordinates: {lat: 30.2695051, lng: -97.7384318},
		foursquare_venue_id: '53af888b498e4cf63ed01128'
	},
	{
		name: 'Blazer Tag',
		coordinates: {lat: 30.2269416, lng: -97.7851305},
		foursquare_venue_id: '49e655d7f964a52039641fe3'
	},
	{
		name: 'Barton Springs',
		coordinates: {lat: 30.2607668, lng: -97.7684726},
		foursquare_venue_id: '441812dbf964a52015311fe3'
	},
	{
		name: 'Peter Pan Golf',
		coordinates: {lat: 30.272183, lng: -97.7674855},
		foursquare_venue_id: '462a4370f964a520d4451fe3'
	},
];

// Create default image, in case image from Foursquare cannot be grabbed
var imgNotAvailable = "https://www.ereplacementparts.com/images/photo_not_available.png";

module.exports = {
	locations: locations,
	imgNotAvailable: imgNotAvailable
};