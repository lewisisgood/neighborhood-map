// Create a map variable
var map;

 // Function to initialize the map within the map div
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 30.2491225, lng: -97.7815471},
		zoom: 13
	});
}