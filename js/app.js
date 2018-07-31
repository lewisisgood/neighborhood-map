var locations = [
	{
		name: 'Zilker Metropolitan Park',
		coordinates: {lat: 30.2669624, lng: -97.775048},
		foursquare_venue_id: '453c8566f964a520123c1fe3',
		imgSrc: "", //foursquare api
		hidden: false
	},
	{
		name: 'Arlos',
		coordinates: {lat: 30.2695051, lng: -97.7384318},
		foursquare_venue_id: '53af888b498e4cf63ed01128',
		imgSrc: "", //foursquare api
		hidden: false
	},
	{
		name: 'Blazer Tag Adventure Center',
		coordinates: {lat: 30.2269416, lng: -97.7851305},
		foursquare_venue_id: '49e655d7f964a52039641fe3',
		imgSrc: "", //foursquare api
		hidden: false
	},
	{
		name: 'Barton Springs',
		coordinates: {lat: 30.2607668, lng: -97.7684726},
		foursquare_venue_id: '441812dbf964a52015311fe3',
		imgSrc: "", //foursquare api
		hidden: false
	},
	{
		name: 'Peter Pan Mini-Golf',
		coordinates: {lat: 30.272183, lng: -97.7674855},
		foursquare_venue_id: '462a4370f964a520d4451fe3',
		imgSrc: "", //foursquare api
		hidden: false
	},
];

var Location = function(data) {
	var self = this;
	this.name = ko.observable(data.name);
	this.coordinates = ko.observable(data.coordinates);
	this.foursquare_venue_id = ko.observable(data.foursquare_venue_id);
	this.imgSrc = ko.observable(data.imgSrc);
	this.hidden = ko.observable(data.hidden);
	
	var foursquareUrl = 'https://api.foursquare.com/v2/venues/' + this.foursquare_venue_id() + '/photos?client_id=IHS0HDH55K55KN03E4MRRVTKTYP00UQEGUAG1SAGM4BUTHOI&client_secret=PE5PUPMEZZWKT2PNIOVJEILRESUMW1NMPGWPTSJHCGN2UOR4&v=20180323';
	console.log(foursquareUrl);
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
}

var ViewModel = function() {
	var self = this;

	this.locationList = ko.observableArray([]);

	locations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem) );
	});

	this.currentLocation = ko.observable( this.locationList()[0] );

	this.selectLocation = function(selectedLocation) {
		self.currentLocation(selectedLocation);
	};
}

// Create a map variable
var map;
// Create a new blank array for all the listing markers.
var markers = [];
 // Function to initialize the map within the map div
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.2491225, lng: -97.7815471},
		zoom: 13
	});
	var largeInfowindow = new google.maps.InfoWindow();

	// The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
	    var position = locations[i].coordinates;
	    var title = locations[i].name;
	    var imgSrc = ko.observable(locations[i].imgSrc);
	    // Create a marker per location, and put into markers array.
	    var marker = new google.maps.Marker({
	    	position: position,
	    	title: title,
	    	animation: google.maps.Animation.DROP,
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


ko.applyBindings(new ViewModel());